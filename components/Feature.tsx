import { featuredProducts } from '@/constants';
import React from 'react';
import ProductCard from './ProductCard';

const Feature = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center mt-10'>
        <h1 className='text-3xl font-semibold'>Featured Products</h1>
        <div className='flex flex-wrap justify-center mt-5 gap-4'>
          {featuredProducts.map((product) => (
            <ProductCard
              className='w-[300px] h-[400px]'
              key={product.id}
              title={product.title}
              subtitle={product.subtitle}
              price={product.price}
              rating={product.rating}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
