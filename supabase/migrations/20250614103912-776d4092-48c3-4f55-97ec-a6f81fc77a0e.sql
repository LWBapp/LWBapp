
-- Create the soulful_tools table
CREATE TABLE public.soulful_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  category TEXT,
  short_description TEXT,
  full_description TEXT,
  offer_available BOOLEAN DEFAULT FALSE,
  offer_text TEXT,
  affiliate_link TEXT,
  extra_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable public read-only access (so unauthenticated users can view the directory)
ALTER TABLE public.soulful_tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to all" ON public.soulful_tools FOR SELECT USING (true);

-- (Optional) If you ever want to allow updates by admins only, you can add more granular policies later.
