'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Button from './Button';
import { motion } from 'framer-motion';
import { supabase } from '@/config/supabaseClient.config';

type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  rating: number;
  image: string;
};

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
  const [products, setProducts] = useState<Product[]>([]);
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (rangeStart: number, rangeEnd: number) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .range(rangeStart, rangeEnd);

      if (error) throw error;
      if (data && data.length > 0) {
        setProducts((prev) => [...prev, ...data]);
        if (data.length < rangeEnd - rangeStart + 1) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(0, 3);
    setStart(4);
  }, []);

  const handleLoadMore = () => {
    fetchProducts(start, start + 9);
    setStart((prev) => prev + 10);
  };

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
          Popular <span className='text-primary'>Products</span>
        </motion.h1>

        {/* Spinner on initial load */}
        {loading && products.length === 0 && (
          <div className='mt-16'>
            <div className='w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-10 w-full'>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              custom={index}
              initial='hidden'
              animate='visible'
              variants={fadeUp}
              className='w-full h-full'
            >
              <ProductCard
                id={product.id}
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

        {/* Load More Button or Spinner */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className='mt-10'
          >
            {loading && products.length > 0 ? (
              <div className='w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto'></div>
            ) : (
              <Button
                onClick={handleLoadMore}
                className='border border-gray-300 text-sm transition-all duration-200 hover:opacity-90 hover:scale-105'
                variant='ghost'
              >
                See More
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Products;
