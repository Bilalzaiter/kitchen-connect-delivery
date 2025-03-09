
import { createClient } from '@supabase/supabase-js';

// Use environment variables or direct values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wfoqgylgdqtcolxngvjs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmb3FneWxnZHF0Y29seG5ndmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTY2NDIsImV4cCI6MjA1NzAzMjY0Mn0.NGljsNFdcNvac2eT2NkNGyiblPEegXomPcfwDrnU_28';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
