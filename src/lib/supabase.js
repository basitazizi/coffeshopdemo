import { createClient } from '@supabase/supabase-js';

// Vite env vars:
// - VITE_SUPABASE_URL
// - VITE_SUPABASE_ANON_KEY
//
// Fallbacks keep the current project working even if env vars are not set yet.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://qluqophnxhrvmwklobhk.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ZLDp_EhhCvgEKQPSaO3zwg_tnpz2ajZ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

