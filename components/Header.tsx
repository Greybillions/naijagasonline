'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/constants/images';
import { link } from '@/constants';
import { CiSearch, CiUser } from 'react-icons/ci';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm transition-all'>
      <div className='flex items-center justify-between w-full h-[80px] max-w-[1300px] mx-auto px-4 md:px-6'>
        {/* Logo */}
        <Link href='/' className='flex items-center'>
          <Image
            src={images.logoWord}
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
              className='px-4 py-2 text-base text-gray-800 rounded-xl transition hover:bg-[#e6e9f2]'
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className='flex items-center gap-2 sm:gap-4'>
          <Button
            variant='ghost'
            className='p-2 sm:px-4 sm:py-2 text-base flex items-center gap-2 hover:bg-[#e6e9f2] rounded-xl'
          >
            <CiSearch className='text-xl text-gray-500' />
          </Button>

          <Link
            href='/login'
            className='p-2 sm:px-4 sm:py-2 text-base flex items-center gap-2 hover:bg-[#e6e9f2] rounded-xl'
          >
            <CiUser className='text-xl text-gray-500' />
            <span className='hidden sm:inline'>Account</span>
          </Link>

          {/* Hamburger Menu Icon - mobile only */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden p-2 rounded-md text-gray-700 hover:bg-[#f3f4f6] transition'
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
        <div className='lg:hidden px-6 pt-4 pb-6 bg-white shadow-md flex flex-col gap-4'>
          {link.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className='text-gray-700 hover:text-orange-500 text-base transition'
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
