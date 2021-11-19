import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Story from '../components/Story';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/dist/client/router';

const Stories = (props) => {
  const { user } = props;
  const router = useRouter();
  console.log(user);
  if (!user) {
    router.push('/login');
  }
  const [storiesInPage, setStoriesInPage] = useState(10);
  const [storyIndex, setStoryIndex] = useState(10);
  const [stories, setStories] = useState(props.stories);
  const [hasMore, setHasMore] = useState(true);

  const getMoreStories = async () => {
    try {
      // const { data } = await supabase
      //   .from('stories')
      //   .select('*')
      //   .order('created_at', { ascending: false })
      //   .range(storyIndex, storyIndex + storiesInPage - 1);
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storyIndex,
          storiesInPage,
        }),
      });
      const {
        response: { data },
      } = await res.json();

      console.log(data);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        // makes sure they are sorted descendengly according to id
        data.sort((a, b) => b.id - a.id);

        setStories((oldStories) => [...oldStories, ...data]);
        setStoryIndex((oldIndex) => oldIndex + storiesInPage);
      }
    } catch (err) {
      setHasMore(false);
      console.log(err);
    }
  };
  const signOut = async () => {
    await fetch('/api/signout');
    // router.push('/login');
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <div className="flex justify-between">
            <h1 className="text-2xl mr-10 font-extrabold text-gray-900">
              Stories
            </h1>
            <button
              onClick={signOut}
              className=" g-blue-500 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Sign Out
            </button>
          </div>

          <div className="mt-6 ">
            <InfiniteScroll
              dataLength={stories.length}
              next={getMoreStories}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center items-center overflow-hidden">
                  <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
                </div>
              }
              endMessage={
                <h2 className="font-bold text-center">
                  No more stories to be shown.
                </h2>
              }
            >
              {stories.map((story) => (
                <Story key={story.id} story={story} />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;

export async function getServerSideProps({ req }) {
  const response = await supabase.auth.api.getUserByCookie(req);
  const { user } = response;
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } };
  }

  const storiesResponse = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  // If there is a user, return it.
  return { props: { user, stories: storiesResponse.data } };
}
