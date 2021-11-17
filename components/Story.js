import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Story = ({ story }) => {
  dayjs.extend(relativeTime);
  const [seeMore, setSeeMore] = useState(false);
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

  const fullText =
    fulltext ||
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et condimentum sem, luctus convallis nisi. Aenean maximus lectus arcu, at pulvinar nibh condimentum eget. Sed a sem a metus eleifend lobortis. Cras vulputate id ante sed vulputate. Pellentesque imperdiet tempus dapibus. Phasellus euismod imperdiet arcu, eu suscipit augue euismod ultrices';

  return (
    <div key={id} className="mb-12 group bg-gray-100">
      <div className="m-auto max-w-xlg rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-5 hover:text-blue-500">
            <a target="_blank" href={url || '#'}>
              {title || 'Default Title for the story'}
            </a>
          </div>
          <p className="text-gray-800 text-base">
            {/* // TODO: fulltext */}
            {seeMore ? fullText : fullText.substring(0, 200) + '...'}
            <span
              onClick={() => setSeeMore(!seeMore)}
              className="text-blue-500 cursor-pointer"
            >
              {seeMore ? ' See less.' : ' See more.'}
            </span>
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
          <p className="text-gray-900 leading-none">{author || 'John Doe'}</p>
          <p className="text-gray-600">
            {dayjs(created_at).fromNow() || 'Default Date'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Story;