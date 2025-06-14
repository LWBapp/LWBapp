
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import jsPDF from "npm:jspdf@2.5.1";
import { decode as base64decode } from "https://deno.land/std@0.190.0/encoding/base64.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Helper to convert DataURL base64 PNG to Uint8Array
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

    // Generate PDF from base64 PNG using jsPDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [480, 640],
    });

    const pngBytes = dataURLtoUint8Array(image);
    // Add image (coordinates, width, height)
    pdf.addImage(pngBytes, "PNG", 0, 0, 480, 640);

    // Return/attach PDF as buffer
    // Use jsPDF's internal buffer (getArrayBuffer for v2.5+)
    const pdfUint8Arr: Uint8Array = pdf.output("arraybuffer") as Uint8Array;

    // Email via Resend API with PDF attached
    const result = await resend.emails.send({
      from: "Soulmap <onboarding@resend.dev>",
      to: [email],
      subject: "Your Soulmap Result",
      html:
        `<p>Hi${name ? ` ${name}` : ""},<br/>Here is your Soulmap result from Life Without Borders.<br/><br/><strong>${quizTitle || "Your Result"}</strong>: ${country}<br/>` +
        `<em>${description}</em><br/><br/>${quote ? `"${quote}"<br/><br/>` : ""}${date}</p><p>Love from, Life Without Borders</p>`,
      attachments: [
        {
          filename: "soulmap.pdf",
          content: pdfUint8Arr,
        },
      ],
    });

    console.log("Soulmap PDF sent to", email, result);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error emailing soulmap PDF:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
