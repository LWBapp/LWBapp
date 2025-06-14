
import { supabase } from "@/integrations/supabase/client";

/**
 * Log a completed quiz to Supabase
 */
export async function logQuizSubmission({
  quizType,
  quizTitle,
  resultMain,
  resultDescription,
  rawAnswers,
  userEmail,
  ipAddress,
}: {
  quizType: string;
  quizTitle?: string;
  resultMain: string;
  resultDescription?: string;
  rawAnswers?: any;
  userEmail?: string | null;
  ipAddress?: string;
}): Promise<void> {
  // Defensive: do not insert without main result or quiz type
  if (!quizType || !resultMain) return;
  try {
    const { error } = await supabase.from("quiz_submissions").insert({
      quiz_type: quizType,
      quiz_title: quizTitle || null,
      result_main: resultMain,
      result_description: resultDescription || null,
      raw_answers: rawAnswers ? JSON.stringify(rawAnswers) : null,
      user_email: userEmail || null,
      ip_address: ipAddress || null,
    });
    if (error) {
      // Log error for debugging but don't throw
      console.error("[Quiz Submission Logging Error]", error);
    }
  } catch (e) {
    // Non-blocking: just log to console
    console.error("[Quiz Submission Logging Exception]", e);
  }
}
