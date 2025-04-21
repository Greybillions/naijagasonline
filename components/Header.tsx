'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/constants/images';
import { link } from '@/constants';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-primary backdrop-blur-md shadow-sm transition-all'>
      <div className='flex items-center justify-between w-full h-[80px] max-w-[1300px] mx-auto px-4 md:px-6'>
        {/* Logo */}
        <Link href='/' className='flex items-center'>
          <Image
            src={images.logo}
            alt='NaijaGasOnline'
            width={200}
            height={200}
            className='object-contain'
          />
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden lg:flex gap-4 items-center'>
          {link.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className='px-4 py-2 text-base text-white rounded-xl transition hover:text-gray-300'
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className='flex items-center gap-2 sm:gap-4'>
          {/* Hamburger Menu Icon - mobile only */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden p-2 rounded-md text-white transition'
          >
            {isMenuOpen ? (
              <HiOutlineX className='text-2xl' />
            ) : (
              <HiOutlineMenuAlt3 className='text-2xl' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='lg:hidden px-6 pt-4 pb-6 bg-primary shadow-md flex flex-col gap-4'>
          {link.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className='text-white text-base transition'
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
