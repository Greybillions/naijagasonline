'use client';

import { products } from '@/constants';
import React from 'react';
import ProductCard from './ProductCard';
import Button from './Button';
import Feature from './Feature';
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
      className='flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto px-4 py-16'
    >
      <div className='flex flex-col items-center w-full justify-center min-h-auto'>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-4xl font-bold text-left w-full'
        >
          Popular Products
        </motion.h1>

        {/* Grid of products with animation */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 w-full'>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <ProductCard
                title={product.title}
                subtitle={product.subtitle}
                price={product.price}
                rating={product.rating}
                image={product.image}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button
            className='border border-gray-300 mt-6 text-sm transition-all duration-200 hover:opacity-90 cursor-pointer hover:scale-103'
            variant='ghost'
          >
            See More
          </Button>
        </motion.div>
      </div>

      <Feature />
    </section>
  );
};

export default Products;
