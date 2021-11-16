import React from 'react';
import { supabase } from '../utils/supabaseClient';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Stories = (props) => {
  dayjs.extend(relativeTime);
  const { user, stories } = props;
  console.log(stories);
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-900">Stories</h2>

          <div className="mt-6 lg:grid md:grid md:grid-cols-2 lg:grid-cols-3 gap-y-11 lg:gap-x-6">
            {stories.map((story) => {
              const {
                id,
                title,
                fulltext,
                summary,
                source,
                published_at,
                url,
                author,
                created_at,
              } = story;

              return (
                <div key={id} className="mb-12 group ">
                  <div className="m-auto max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-5 hover:text-blue-500">
                        <a target="_blank" href={url || '#'}>
                          {title || 'Default Title for the story'}
                        </a>
                      </div>
                      <p className="text-gray-700 text-base">
                        {/* // TODO: fulltext */}
                        {summary ||
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et condimentum sem, luctus convallis nisi. Aenean maximus lectus arcu, at pulvinar nibh condimentum eget. Sed a sem a metus eleifend lobortis. Cras vulputate id ante sed vulputate. Pellentesque imperdiet tempus dapibus. Phasellus euismod imperdiet arcu, eu suscipit augue euismod ultrices'}
                      </p>
                      <p className="my-5 text-gray-700 text-base">
                        Source:&nbsp;&nbsp;
                        <a
                          className="underline text-blue-500 hover:text-blue-400"
                          target="_blank"
                          href={`https://${source || 'https://www.google.com'}`}
                        >{`${source || 'www.google.com'}`}</a>
                      </p>
                    </div>

                    <div className="text-sm px-6 pt-4 pb-2">
                      <p className="text-gray-900 leading-none">
                        {author || 'John Doe'}
                      </p>
                      <p className="text-gray-600">
                        {dayjs(created_at).fromNow() || 'Default Date'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
    .limit(100);

  // If there is a user, return it.
  return { props: { user, stories: storiesResponse.data } };
}
