'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { servicePoints } from '@/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: i * 0.2,
    },
  }),
};

const About = () => {
  return (
    <section id='about' className='bg-white py-20 px-4'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='max-w-6xl mx-auto flex flex-col items-center text-center'
      >
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
          About <span className='text-orange-500'>Us</span>
        </h1>
        <p className='text-lg text-gray-700 max-w-3xl mb-12'>
          At NaijaGas Online, we do more than deliver gas — we connect, inform,
          and empower the oil and gas community.
        </p>

        <div className='grid md:grid-cols-2 gap-8 text-left w-full'>
          {servicePoints.map((point, index) => (
            <motion.div
              key={point.title}
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={fadeUp}
              className='bg-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition'
            >
              <h3 className='text-xl font-semibold text-orange-500 mb-2'>
                {point.title}
              </h3>
              <p className='text-gray-700 text-sm'>{point.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
