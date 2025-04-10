'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import Link from 'next/link';
import Button from './Button';
import clsx from 'clsx';

type ProductCardProps = {
  title: string;
  subtitle: string;
  price: number;
  rating: number;
  image: string;
  onBuy?: () => void;
  className?: string;
};

const ProductCard = ({
  title,
  subtitle,
  price,
  rating,
  image,
  onBuy,
  className,
}: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked((prev) => !prev);

  return (
    <div
      className={clsx(
        'w-60 h-full p-4 rounded-2xl shadow-md border border-gray-200 bg-white',
        className
      )}
    >
      {/* Product Image */}
      <div className='relative w-full h-48 mb-4 rounded-lg overflow-hidden'>
        <Link href={`/product/${title}`}>
          <Image src={image} alt={title} layout='fill' objectFit='contain' />
        </Link>

        {/* Heart Icon Toggle */}
        <button
          onClick={toggleLike}
          className='absolute top-2 right-2 bg-white p-1 rounded-full shadow'
        >
          {liked ? (
            <GoHeartFill className='text-red-500 text-xl' />
          ) : (
            <GoHeart className='text-gray-500 text-xl' />
          )}
        </button>
      </div>

      {/* Title */}
      <h3 className='text-base font-semibold text-gray-800'>{title}</h3>

      {/* Subtitle */}
      <p className='text-sm text-gray-500 truncate'>{subtitle}</p>

      {/* Rating */}
      <div className='flex items-center mt-1 space-x-1 text-sm'>
        <span className='text-orange-500 font-semibold'>{rating}</span>
        <span className='text-orange-500'>
          {'★'.repeat(Math.floor(rating))}
          {'☆'.repeat(5 - Math.floor(rating))}
        </span>
      </div>

      {/* Price and Button */}
      <div className='mt-4 flex items-center justify-between'>
        <span className='text-sm font-semibold text-gray-900'>
          ${price.toFixed(2)}
        </span>
        <Button
          onClick={onBuy}
          variant='primary'
          className='px-4 py-1.5 rounded-full cursor-pointer text-xs font-medium'
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
