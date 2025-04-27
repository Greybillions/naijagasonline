'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { images } from '@/constants/images';
import Image from 'next/image';

const RiderCarousel = () => {
  return (
    <div className='w-full max-w-7xl mx-auto my-16 rounded-3xl overflow-hidden shadow-2xl'>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect='fade'
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]'
      >
        {images.riders.map((img, index) => (
          <SwiperSlide key={index} className='relative'>
            <Image
              src={img}
              alt={`Rider ${index + 1}`}
              className='w-full h-full object-cover'
              fill
              priority
            />

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className='absolute bottom-8 left-8 bg-black/60 text-white px-6 py-4 rounded-xl shadow-lg max-w-lg backdrop-blur-md md:text-lg lg:text-xl'
            >
              <p className='leading-snug font-semibold'>
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
