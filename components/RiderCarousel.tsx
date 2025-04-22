'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { images } from '@/constants/images';
import Image from 'next/image';

const RiderCarousel = () => {
  return (
    <div className='w-full max-w-3xl mx-auto my-10 rounded-2xl overflow-hidden shadow-lg'>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect='fade'
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className='w-full h-[400px]'
      >
        {images.riders.map((img, index) => (
          <SwiperSlide key={index} className='relative'>
            <Image
              src={img}
              alt={`Rider ${index + 1}`}
              className='w-full h-full object-cover'
              width={500}
              height={500}
            />

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className='absolute bottom-6 left-6 bg-black/60 text-white px-5 py-3 rounded-xl shadow-md max-w-sm backdrop-blur-md'
            >
              <p className='text-lg font-medium'>
                {images.riderCaptions[index]}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RiderCarousel;
