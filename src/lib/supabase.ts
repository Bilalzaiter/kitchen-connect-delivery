
import { createClient } from '@supabase/supabase-js';

// Default fallback values for development (never expose actual keys here)
const defaultSupabaseUrl = 'https://your-project-url.supabase.co';
const defaultSupabaseAnonKey = 'your-anon-key';

// Use environment variables or fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultSupabaseUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultSupabaseAnonKey;

if (supabaseUrl === defaultSupabaseUrl || supabaseAnonKey === defaultSupabaseAnonKey) {
  console.warn('Using default Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
