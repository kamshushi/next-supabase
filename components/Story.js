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

  const fullText = fulltext || 'No description available';
  return (
    <div key={id} className="mb-12 group bg-gray-100">
      <div className="m-auto max-w-xlg rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-5 hover:text-blue-500">
            {title ? (
              <a target={url && '_blank'} href={url || '#'}>
                {title}
              </a>
            ) : (
              <span className="cursor-pointer">Title is not available</span>
            )}
          </div>
          <p className="text-gray-800 text-base">
            {/* // TODO: fulltext */}
            {seeMore ? fullText : fullText.substring(0, 950) + '...'}
            {fullText.length > 950 && (
              <span
                onClick={() => setSeeMore(!seeMore)}
                className="text-blue-500 cursor-pointer"
              >
                {seeMore ? ' See less.' : ' See more.'}
              </span>
            )}
          </p>
          <p className="text-gray-700 text-base">
            Source:&nbsp;&nbsp;
            {source ? (
              <a
                className="underline text-blue-500 hover:text-blue-400"
                target="_blank"
                href={`https://${source}`}
              >{`${source}`}</a>
            ) : (
              <span className="text-red-500">Not Available</span>
            )}
          </p>
        </div>

        <div className="text-sm px-6  pb-2">
          <p className="text-gray-900 leading-none">{author || 'Unknown'}</p>
          <p className="text-gray-600">
            {dayjs(created_at).fromNow() || 'Undefined'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Story;
