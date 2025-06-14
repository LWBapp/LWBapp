
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import jsPDFModule from "npm:jspdf@2.5.1";

// Fix: get the jsPDF constructor correctly for Deno+npm:jspdf usage
const jsPDF = jsPDFModule.jsPDF;

// Get Loops API key from Supabase secret
const LOOPS_API_KEY = Deno.env.get("email-soulmap-pdf");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Helper: convert DataURL base64 PNG to Uint8Array
function dataURLtoUint8Array(dataurl: string): Uint8Array {
  const arr = dataurl.split(",");
  if (arr.length < 2) throw new Error("Invalid dataurl format");
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return u8arr;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, image, name, quizTitle, country, description, date, quote } = await req.json();
    if (!LOOPS_API_KEY) {
      throw new Error("Loops API key is missing in the environment (email-soulmap-pdf).");
    }

    // Create PDF from provided PNG
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [480, 640],
    });
    const pngBytes = dataURLtoUint8Array(image);
    pdf.addImage(pngBytes, "PNG", 0, 0, 480, 640);

    // Grab the PDF as a base64 string, without header
    const pdfBase64 = pdf.output("datauristring").split(",")[1];

    // Prepare the Loops API payload (https://docs.loops.so/reference/emailsend)
    const toField = [{ email_address: email }];
    const subject = "Your Soulmap Result";
    const html =
      `<p>Hi${name ? ` ${name}` : ""},<br/>Here is your Soulmap result from Life Without Borders.<br/><br/>` +
      `<strong>${quizTitle || "Your Result"}</strong>: ${country}<br/>` +
      `<em>${description}</em><br/><br/>${quote ? `"${quote}"<br/><br/>` : ""}${date}</p>` +
      `<p>Love from, Life Without Borders</p>`;

    // Loops expects base64 attachment as array [{ filename, content }]
    const attachments = [
      {
        filename: "soulmap.pdf",
        content: pdfBase64,
        mime_type: "application/pdf",
      },
    ];

    // Send email via Loops API
    const loopsRes = await fetch("https://app.loops.so/api/v1/email/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOOPS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: toField,
        subject,
        html_body: html,
        attachments,
      }),
    });

    if (!loopsRes.ok) {
      const errorBody = await loopsRes.text();
      throw new Error(`Loops API error: ${errorBody}`);
    }

    // Success
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Error emailing soulmap PDF via Loops:", err);
    return new Response(
      JSON.stringify({ error: err?.message || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

