// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qnrnhncmfhcsktkhekzx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucm5obmNtZmhjc2t0a2hla3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTQ3NTksImV4cCI6MjA2NTQ3MDc1OX0.wutKw3m4VzwChl09M4tgCvhPMvbv9BN-hhy6l05AXpU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);