import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ogkfsyqvbskwgeemhxx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9na2Z5c3NxdmJza3dnZWVtaHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzY1NzksImV4cCI6MjA2NDExMjU3OX0.G3OOz-Xt-QaHwCLedgRi35AjqngVQvTYqWsTxxPQiMo'; // Paste full anon key here

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
