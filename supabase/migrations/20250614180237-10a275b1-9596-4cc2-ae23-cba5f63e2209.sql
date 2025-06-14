
-- Create quiz_submissions table for logging quiz completions
CREATE TABLE public.quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  quiz_type TEXT NOT NULL,
  quiz_title TEXT,
  result_main TEXT NOT NULL,
  result_description TEXT,
  user_email TEXT,
  raw_answers JSONB,
  ip_address TEXT
);

-- Enable row level security and allow public inserts (logging only)
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (logging)
CREATE POLICY "Allow insert for all" ON public.quiz_submissions
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read (logging)
CREATE POLICY "Allow read for all" ON public.quiz_submissions
  FOR SELECT USING (true);

-- Optionally, lock down update/delete (default is deny for everyone)
