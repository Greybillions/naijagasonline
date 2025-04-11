'use client';

import React from 'react';
import { featuredProducts } from '@/constants';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const Feature = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 16 },
      },
      '(min-width: 768px)': {
        slides: { perView: 3, spacing: 20 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 4, spacing: 24 },
      },
    },
    slides: {
      perView: 1.2,
      spacing: 12,
    },
    mode: 'free-snap',
  });

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8 mt-16'>
      <div className='max-w-7xl mx-auto flex flex-col items-center'>
        <h1 className='text-2xl sm:text-3xl font-semibold text-center mb-8'>
          Featured Products
        </h1>

        {/* Carousel (Keen Slider) */}
        <div ref={sliderRef} className='keen-slider w-full'>
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className='keen-slider__slide h-[420px]' // Ensures each slide has consistent height
              custom={index}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <ProductCard
                title={product.title}
                subtitle={product.subtitle}
                price={product.price}
                rating={product.rating}
                image={product.image}
                className='w-full h-full flex flex-col'
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
