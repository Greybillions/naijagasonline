'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const CylinderPromo = () => {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / windowHeight) * 100;

      if (scrollPercent > 30 && !closed) {
        setVisible(true);
      } else if (scrollPercent <= 30) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [closed]);

  if (!visible || closed) return null;

  return (
    <motion.div
      initial={{ x: 300, opacity: 0.95 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className='fixed top-1/3 right-4 z-50 bg-green-600 text-white p-4 rounded-xl shadow-xl w-72 animate-fade-in'
    >
      <button
        onClick={() => setClosed(true)}
        className='absolute top-1 right-2 text-white text-lg font-bold focus:outline-none'
        aria-label='Close'
      >
        ×
      </button>

      <h3 className='text-lg font-bold mb-1'>Cylinder Easy Buy</h3>
      <p className='text-sm'>
        Pay <strong>30%</strong> down payment and complete payment in{' '}
        <strong>3 months</strong>.
      </p>
    </motion.div>
  );
};

export default CylinderPromo;
