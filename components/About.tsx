'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const aboutPoints = [
  'We are an LPG booking and delivery outfit, set up to provide convenience for all homes and kitchens — anytime, anywhere.',
  'Our prices are competitive, and our delivery time is the fastest, equipped with state-of-the-art technology to ensure safe doorstep delivery.',
  'We offer morning and night delivery services, including our Emergency Support Combo for when you run out of gas mid-cooking.',
  'Naija Gas Online is proudly Nigerian — founded and funded as the first q-commerce platform in the oil and gas sector.',
  'We launched in 2019 in Port Harcourt, reaching over 10,000 LPG subscribers within just 18 months.',
  'Now serving Lagos with fast, safe delivery to homes, restaurants, hotels, and businesses.',
  'Our expert team ensures the safety of our riders and the quality of LPG delivered to every customer.',
];

const About = () => {
  return (
    <section id='about' className='bg-white px-4'>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeUp}
        className='max-w-5xl mx-auto flex flex-col items-center text-center'
      >
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
          About <span className='text-primary'>Us</span>
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mb-10'>
          We’re more than just gas delivery. NaijaGas Online powers your kitchen
          with speed, safety, and support — wherever you are.
        </p>

        <div className='bg-gray-50 border border-gray-200 rounded-2xl p-8 text-left shadow-lg w-full'>
          <ul className='space-y-4 list-disc list-inside text-gray-700 text-sm leading-relaxed'>
            {aboutPoints.map((point, index) => (
              <motion.li
                key={index}
                custom={index}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={fadeUp}
              >
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
