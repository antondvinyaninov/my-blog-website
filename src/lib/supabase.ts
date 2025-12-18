import { createClient } from '@supabase/supabase-js';

// Для серверного рендеринга используем process.env
const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.SUPABASE_URL || 'https://baze-supabase.crv1ic.easypanel.host';
const supabaseKey = process.env.SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || '';

if (!supabaseKey) {
  console.error('❌ SUPABASE_ANON_KEY is not set!');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
