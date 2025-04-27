'use client';

import React, { JSX, useEffect, useState } from 'react';
import { footerLinks, socialIcons } from '@/constants';
import {
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';
import Image from 'next/image';
import { images } from '@/constants/images';
import { supabase } from '@/config/supabaseClient.config';

const iconMap: Record<string, JSX.Element> = {
  facebook: <FaFacebookF />,
  youtube: <FaYoutube />,
  pinterest: <FaPinterestP />,
  instagram: <FaInstagram />,
  twitter: <FaTwitter />,
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [success]);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (!error) {
      setSuccess(true);
      setEmail('');
    } else {
      console.error('Subscription error:', error.message);
    }
  };

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
              <a key={icon} href={url} className='hover:text-white transition'>
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
          <form
            onSubmit={handleSubscribe}
            className='flex flex-col sm:flex-row items-stretch max-w-md w-full space-y-3 sm:space-y-0 sm:space-x-2'
          >
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='flex-1 px-4 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none bg-gray-800 text-white border border-gray-600 placeholder:text-gray-400'
            />
            <button
              type='submit'
              className='px-6 py-2 bg-primary text-white font-semibold rounded-md sm:rounded-r-md sm:rounded-l-none bg-primary-hover transition'
            >
              Subscribe
            </button>
          </form>

          {success && (
            <p className='text-green-400 text-sm mt-2'>
              🎉 Subscription successful!
            </p>
          )}

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
            <Image
              src={images.logo}
              alt='Logo'
              width={150}
              height={150}
              className='mb-3 object-contain self-start'
            />
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
        <p className='text-center'>
          Copyright © 2025 NaijaGasOnline All Rights Reserved.
        </p>
        <a href='#' className='underline mt-2 md:mt-0'>
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
