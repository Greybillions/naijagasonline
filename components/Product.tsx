'use client';

import { products } from '@/constants';
import React from 'react';
import ProductCard from './ProductCard';
import Button from './Button';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: 'easeOut',
    },
  }),
};

const Products = () => {
  return (
    <section
      id='shop'
      className='flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-16'
    >
      <div className='w-full max-w-7xl flex flex-col items-center justify-center'>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-3xl sm:text-4xl font-bold text-left w-full'
        >
          Popular Products
        </motion.h1>

        {/* Product Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-10 w-full'>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={fadeUp}
              className='w-full h-full'
            >
              <ProductCard
                title={product.title}
                subtitle={product.subtitle}
                price={product.price}
                rating={product.rating}
                image={product.image}
                className='w-full h-full'
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className='mt-10'
        >
          <Button
            className='border border-gray-300 text-sm transition-all duration-200 hover:opacity-90 hover:scale-105'
            variant='ghost'
          >
            See More
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
