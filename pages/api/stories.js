import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  const { storyIndex, storiesInPage } = req.body;

  const storiesResponse = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false })
    .range(storyIndex, storyIndex + storiesInPage - 1);

  res.status(200).json({ response: storiesResponse });
}
