import React from 'react';
import { supabase } from '../utils/supabaseClient';

const Stories = (props) => {
  const { user, stories } = props;
  console.log(stories);
  return <div></div>;
};

export default Stories;

export async function getServerSideProps({ req }) {
  const response = await supabase.auth.api.getUserByCookie(req);
  const { user } = response;
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } };
  }

  const storiesResponse = await supabase.from('stories').select('*');

  // If there is a user, return it.
  return { props: { user, stories: storiesResponse.data } };
}
