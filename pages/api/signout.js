import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  supabase.auth.signOut();

  res.status(200).json({ status: 'successful' });
}
