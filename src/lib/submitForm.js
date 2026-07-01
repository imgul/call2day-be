import { supabase } from '@/lib/supabaseClient';

/**
 * @param {"contact" | "agent"} type
 * @param {Record<string, string>} fields
 */
export async function submitForm(type, fields) {
  const { error } = await supabase.functions.invoke('send-email', {
    body: { type, fields },
  });
  if (error) throw error;
}
