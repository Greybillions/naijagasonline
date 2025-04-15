'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBolt,
  FaTools,
  FaFireExtinguisher,
  FaCogs,
  FaWrench,
} from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  {
    title: 'EasyBuy for LPG Cylinder/Gas Cooker',
    description:
      'Quick and flexible EasyBuy options for Lagos Corpers to own their gas appliances.',
    icon: <FaBolt className='text-3xl text-orange-500' />,
  },
  {
    title: 'EasyBuy for Stoves and Cookers',
    description:
      'Get stoves and cookers on EasyBuy plans designed for affordability and access.',
    icon: <FaTools className='text-3xl text-orange-500' />,
  },
  {
    title: 'Cooking Accessory Maintenance',
    description:
      'We provide reliable repair and maintenance services for your kitchen accessories.',
    icon: <FaCogs className='text-3xl text-orange-500' />,
  },
  {
    title: 'Home Gas Installation & Setup',
    description:
      'Professional installation of LPG systems and gas lines in your home or kitchen.',
    icon: <FaFireExtinguisher className='text-3xl text-orange-500' />,
  },
  {
    title: 'Repair & Replacement of Bad Cylinders',
    description:
      'We safely handle inspection, replacement, and disposal of expired or faulty cylinders.',
    icon: <FaWrench className='text-3xl text-orange-500' />,
  },
];

const Service = () => {
  return (
    <section className='bg-white'>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='max-w-6xl mx-auto text-center py-10 px-4'
      >
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
          Our <span className='text-orange-500'>Services</span>
        </h1>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto mb-12'>
          We bring convenience, affordability, and quality service right to your
          doorstep.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className='bg-gray-100 rounded-xl p-6 shadow-md text-left'
            >
              {service.icon}
              <h3 className='text-xl font-semibold text-gray-800 mt-4 mb-2'>
                {service.title}
              </h3>
              <p className='text-sm text-gray-600'>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </section>
  );
};

export default Service;
