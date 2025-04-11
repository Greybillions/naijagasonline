'use client';

import React from 'react';
import Header from './Header';
import Image from 'next/image';
import { images } from '@/constants/images';
import Button from './Button';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
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
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Hero = () => {
  return (
    <section className='relative flex flex-col min-h-screen w-full overflow-hidden bg-white'>
      <Header />
      <div className='h-[1px] w-full bg-gray-300' />

      <motion.div
        initial='hidden'
        animate='show'
        variants={container}
        className='mx-auto max-w-[1300px] p-6 sm:p-10 mt-6 w-full bg-[#e6e9f2] rounded-2xl h-auto md:h-[80vh]'
      >
        <div className='flex flex-col-reverse md:flex-row items-center justify-between w-full h-full gap-10'>
          {/* Text content */}
          <div className='w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left items-center md:items-start justify-center'>
            <motion.p
              variants={item}
              className='text-lg sm:text-xl text-[#ea580c]'
            >
              Exclusive Deal 40% off
            </motion.p>

            <motion.h1
              variants={item}
              className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight'
            >
              Fast & Reliable Gas Delivery, Right to Your Doorstep
            </motion.h1>

            <motion.div
              variants={item}
              className='flex flex-col sm:flex-row gap-3 mt-4 justify-center md:justify-start'
            >
              <Button
                variant='primary'
                url='/shop'
                className='hover:scale-102 w-full sm:w-auto'
              >
                Order Now
              </Button>
              <Button
                variant='ghost'
                url='/shop'
                className='hover:translate-x-1 w-full sm:w-auto'
              >
                Learn More
                <MdOutlineArrowRightAlt className='text-2xl ml-2 transition-all' />
              </Button>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            variants={item}
            className='w-full md:w-1/2 flex items-center justify-center'
          >
            <Image
              src={images.hero}
              alt='hero'
              width={400}
              height={400}
              className='lg:w-[450px] h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain'
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
