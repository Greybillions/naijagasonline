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
    <section className='relative flex flex-col h-screen w-full overflow-hidden'>
      <Header />
      <div className='h-[1px] w-full bottom-0 left-0 bg-gray-300' />

      <motion.div
        initial='hidden'
        animate='show'
        variants={container}
        className='mx-auto h-[75%] max-w-[1300px] p-10 rounded-2xl mt-6 w-full bg-[#e6e9f2]'
      >
        <div className='flex items-center justify-start h-full w-full'>
          {/* Text content */}
          <div className='flex flex-col items-start w-[50%] justify-center gap-4'>
            <motion.p variants={item} className='text-xl text-[#ea580c]'>
              Exclusive Deal 40% off
            </motion.p>

            <motion.h1
              variants={item}
              className='text-4xl md:text-6xl font-bold text-gray-800'
            >
              Fast & Reliable Gas Delivery, Right to Your Doorstep
            </motion.h1>

            <motion.div
              variants={item}
              className='flex items-center justify-start gap-2 mt-4'
            >
              <Button variant='primary' url='/shop' className='hover:scale-102'>
                Order Now
              </Button>
              <Button
                variant='ghost'
                url='/shop'
                className='hover:translate-x-1'
              >
                Learn More
                <MdOutlineArrowRightAlt className='text-2xl ml-2 transition-all' />
              </Button>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            variants={item}
            className='flex items-center relative justify-center w-[50%] h-full'
          >
            <Image src={images.hero} alt='hero' width={420} height={420} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
