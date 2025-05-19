'use client';

import React, { useState } from 'react';

const VideoTutorial = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className='w-full mb-10 px-4 sm:px-6 py-6 sm:py-8 lg:py-10 bg-white rounded-lg sm:rounded-xl max-w-5xl mx-auto'>
      <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 text-center text-gray-800'>
        Watch our tutorial on how to buy gas online
      </h2>

      {/* Video Container with aspect ratio */}
      <div className='relative w-full pb-[56.25%] rounded-lg sm:rounded-xl overflow-hidden shadow-lg bg-gray-100'>
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        )}

        <video
          className='absolute top-0 left-0 w-full h-full object-contain bg-black'
          controls
          preload='metadata'
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
        >
          <source src='/video/vid.MP4' type='video/mp4' />
          <source src='/video/vid.webm' type='video/webm' />
          Your browser does not support the video tag.
        </video>

        {hasError && (
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-600 p-4'>
            <svg
              className='w-16 h-16 mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <p className='text-center'>
              Unable to load video. Please check your connection or try again
              later.
            </p>
          </div>
        )}
      </div>

      <p className='mt-4 text-sm text-gray-600 text-center'>
        Tip: Click the fullscreen button for the best viewing experience
      </p>
    </div>
  );
};

export default VideoTutorial;
