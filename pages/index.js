import React from 'react';
import { supabase } from '../utils/supabaseClient';

const Stories = (props) => {
  const { user, stories } = props;
  console.log(stories);
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-900">Stories</h2>

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            <div className="group relative">
              <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
                  alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <a href="#">
                  <span className="absolute inset-0"></span>
                  Desk and Office
                </a>
              </h3>
              <p className="text-base font-semibold text-gray-900">
                Work from home accessories
              </p>
            </div>

            <div className="group relative">
              <div class="max-w-sm w-full lg:max-w-full lg:flex ">
                <div class="border-r  rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                  <div class="mb-8">
                    <div class="text-gray-900 font-bold text-xl mb-2">
                      Can coffee make you a better developer?
                    </div>
                    <p class="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p>
                  </div>
                  <div class="flex items-center">
                    <div class="text-sm">
                      <p class="text-gray-900 leading-none">Jonathan Reinink</p>
                      <p class="text-gray-600">Aug 18</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                  </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #photography
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #travel
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #winter
                  </span>
                </div>
              </div>
            </div>
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

  const storiesResponse = await supabase.from('stories').select('*');

  // If there is a user, return it.
  return { props: { user, stories: storiesResponse.data } };
}
