import Image from 'next/image';
import React from 'react';
import { images } from '@/constants/images';
import { link } from '@/constants';
import Link from 'next/link';
import { CiSearch, CiUser } from 'react-icons/ci';
import Button from './Button';

const Header = () => {
  return (
    <header className='flex items-center bg-transparent justify-between relative w-full h-[100px] max-w-[1300px] mx-auto px-4'>
      <Link href='/' className='flex items-center justify-center'>
        <Image
          src={images.logoWord}
          alt='NaijaGasOnline'
          width={300}
          height={300}
        />
      </Link>
      <div className='w-auto relative transition-al h-10 flex items-center justify-center'>
        {link.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className='px-4 py-2 text-base rounded-xl transition-all hover:bg-[#e6e9f2] hover:rounded-2xl'
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className='flex items-center justify-center gap-4'>
        <Button
          variant='ghost'
          className='px-4 py-2 text-base transition-all flex justify-center items-center gap-2 hover:bg-[#e6e9f2] rounded-xl'
        >
          <CiSearch className='text-xl text-gray-500' />
        </Button>
        <Link
          href='/login'
          className='px-4 py-2 text-base transition-all flex justify-center items-center gap-2 hover:bg-[#e6e9f2] rounded-xl'
        >
          <CiUser className='text-xl text-gray-500' />
          Account
        </Link>
      </div>
    </header>
  );
};

export default Header;
