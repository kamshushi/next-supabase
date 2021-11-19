import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Story from '../components/Story';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/dist/client/router';
import { Auth } from '@supabase/ui';

const Stories = (props) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(supabase.auth.user());

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser]);
  const [storiesInPage, setStoriesInPage] = useState(10);
  const [storyIndex, setStoryIndex] = useState(10);
  const [stories, setStories] = useState(
    props.stories.sort((a, b) => b.id - a.id)
  );
  const [hasMore, setHasMore] = useState(true);

  const getMoreStories = async () => {
    try {
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
    supabase.auth.signOut();
    setCurrentUser(null);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <div className="flex justify-between">
            <h1 className="text-2xl mr-10 font-extrabold text-gray-900">
              Stories
            </h1>
          </div>
          {stories ? (
            <div className="mt-6 ">
              <InfiniteScroll
                dataLength={stories.length || 0}
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
              <button
                onClick={signOut}
                className="border-solid	border-2 p-3 hover:bg-red-500 hover:text-white border-gray-200 shadow-lg fixed right-0 bottom-0 bg-gray-200  m-8 rounded-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <h2 className="font-bold text-center">
              No more stories to be shown.
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stories;

export async function getServerSideProps({ req }) {
  const storiesResponse = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return { props: { stories: storiesResponse.data } };
}
