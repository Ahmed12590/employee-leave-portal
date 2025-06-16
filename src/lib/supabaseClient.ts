'use client';

import { createClient } from '@supabase/supabase-js';

// fallback handling to avoid undefined values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
