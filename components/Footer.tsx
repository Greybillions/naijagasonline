'use client';

import React from 'react';
import { footerLinks, socialIcons } from '@/constants';
import {
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

const iconMap: Record<string, JSX.Element> = {
  facebook: <FaFacebookF />,
  youtube: <FaYoutube />,
  pinterest: <FaPinterestP />,
  instagram: <FaInstagram />,
  twitter: <FaTwitter />,
};

const Footer = () => {
  return (
    <footer className='bg-[#111827] text-white pt-16 pb-6 px-6'>
      <div className='max-w mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
        {/* Left */}
        <div>
          <h2 className='text-3xl font-bold'>Stay updated, stay connected</h2>
          <p className='text-sm text-gray-400 mt-3 max-w-md'>
            Seamless transactions, personalized insights, and innovative
            solutions for a smarter tomorrow.
          </p>

          {/* Social icons */}
          <div className='flex gap-4 mt-6 text-lg text-gray-300'>
            {socialIcons.map(({ icon, url }) => (
              <a
                key={icon}
                href={url}
                className='hover:text-orange-500 transition'
              >
                {iconMap[icon]}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Email Subscription */}
        <div className='w-full'>
          <h3 className='text-lg font-semibold mb-3'>
            Get Our News And Updates
          </h3>
          <form className='flex flex-col sm:flex-row items-stretch max-w-md w-full space-y-3 sm:space-y-0 sm:space-x-2'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-1 px-4 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none bg-gray-800 text-white border border-gray-600 placeholder:text-gray-400'
            />
            <button
              type='submit'
              className='px-6 py-2 bg-orange-500 text-white font-semibold rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-orange-600 transition'
            >
              Subscribe
            </button>
          </form>

          <p className='text-xs text-gray-500 mt-2'>
            By subscribing you agree to our{' '}
            <a href='#' className='underline'>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-gray-700 mt-12 pt-10'>
        <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm text-gray-400'>
          {/* Catalog */}
          <div>
            <h4 className='text-white font-semibold mb-3'>Catalog</h4>
            <p>
              Seamless transactions, personalized insights, and smarter
              solutions.
            </p>
          </div>

          {/* Dynamic columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className='text-white font-semibold mb-3 capitalize'>
                {title}
              </h4>
              <ul className='space-y-2'>
                {links.map((link) => (
                  <li key={link}>
                    <a href='#' className='hover:text-orange-500'>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className='mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500'>
        <p>Copyright © 2025 Catalog All Rights Reserved.</p>
        <a href='#' className='underline mt-2 md:mt-0'>
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
