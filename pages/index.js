import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Story from '../components/Story';
import InfiniteScroll from 'react-infinite-scroll-component';

const Stories = (props) => {
  const { user } = props;
  const [storiesInPage, setStoriesInPage] = useState(15);
  const [storyIndex, setStoryIndex] = useState(16);
  const [stories, setStories] = useState(props.stories);
  const [hasMore, setHasMore] = useState(true);
  console.log(storyIndex);

  const getMoreStories = async () => {
    try {
      const { data } = await supabase
        .from('stories')
        .select('*')
        .range(storyIndex, storyIndex + storiesInPage)
        .order('created_at', { ascending: false })
        .limit(storiesInPage);

      setStories((oldStories) => [...oldStories, ...data]);
      setStoryIndex((oldIndex) => oldIndex + storiesInPage + 1);
    } catch (err) {
      setHasMore(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-900">Stories</h2>

          <div className="mt-6 ">
            <InfiniteScroll
              dataLength={stories.length}
              next={getMoreStories}
              hasMore={hasMore}
              loader={<h3>Loading...</h3>}
              endMessage={<h4>Nothing more to show.</h4>}
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
  // if (!user) {
  //   // If no user, redirect to index.
  //   return { props: {}, redirect: { destination: '/login', permanent: false } };
  // }

  const storiesResponse = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(15);

  // If there is a user, return it.
  return { props: { user, stories: storiesResponse.data } };
}
