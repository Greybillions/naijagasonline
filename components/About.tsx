'use client';

import React from 'react';
import { motion } from 'framer-motion';

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

const aboutPoints = [
  'We are LPG booking and delivery outfit. Setup to provide convenience for all homes and cooking kitchens anywhere anytime.',
  'Our prices are competitive and delivery time is the fastest equipped with state of the earth technology to deliver your cooking gas to your home safely.',
  'We provide morning and night services even at the point when you run out of gas while cooking, we provide the Emergency Support Combo.',
  'Naija Gas Online is a Nigerian founded and funded first q-commerce platform in the oil and gas industry.',
  'First launched in 2019 at the city of Port Harcourt. Sweeping over 10,000 LPG monthly subscribers within 18 months of launching.',
  'Now in Lagos City supporting homes, kitchens, restaurants, hotels and all business with our services.',
  "We have a team of industry experts ensuring the safety of our riders, and quality assurance of the product to be delivered. LPG is the best for our customer's protection.",
];

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
          {aboutPoints.map((point, index) => (
            <motion.div
              key={index}
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={fadeUp}
              className='bg-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition'
            >
              <p className='text-gray-700 text-sm'>{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
