'use client';

import React from 'react';
import Image from 'next/image';
import { images } from '@/constants/images';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const Banner = () => {
  return (
    <section className='relative bg-grid w-full h-auto overflow-hidden'>
      <motion.div
        initial='hidden'
        animate='show'
        variants={container}
        className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 relative z-10'
      >
        {/* Left - Image */}
        <motion.div
          variants={item}
          className='md:w-1/2 w-full flex justify-center'
        >
          <Image
            src={images.banner}
            alt='Banner'
            width={380}
            height={380}
            className='object-contain'
          />
        </motion.div>

        {/* Right - Text */}
        <motion.div
          variants={item}
          className='md:w-1/2 w-full flex flex-col justify-center text-white mt-10 md:mt-0 gap-4 text-center md:text-left'
        >
          <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
            Elegant Craft Gas <span className='text-orange-500'>Cylinder</span>
          </h1>
          <p className='text-base md:text-lg text-white/90'>
            Designed for safety, crafted with style. Premium gas delivery at
            your doorstep.
          </p>
          <motion.button
            variants={item}
            className='mt-4 w-fit bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition'
          >
            Shop Now
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
