'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const Contact = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id='contact' className='min-h-screen bg-white py-20 px-6'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-4xl font-bold mb-6 text-gray-900 text-center'>
          Contact <span className='text-orange-500'>Us</span>
        </h1>

        <div className='grid md:grid-cols-2 gap-10'>
          {/* Contact Info */}
          <div className='space-y-6'>
            <p className='text-lg text-gray-700'>
              We are here to help with your gas delivery, product inquiries, or
              business partnerships. Reach out via the form or contact info
              below.
            </p>
            <div className='space-y-2'>
              <p>
                <strong>📞 Phone:</strong> +234 812 345 6789
              </p>
              <p>
                <strong>📍 Address:</strong> 101 Gas Line Street, Lagos, Nigeria
              </p>
              <p>
                <strong>✉️ Email:</strong> support@naijagasonline.com
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className='space-y-5 w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <input
                type='text'
                placeholder='Your Name'
                className='border border-gray-300 p-3 rounded-md w-full'
                required
              />
              <input
                type='email'
                placeholder='Your Email'
                className='border border-gray-300 p-3 rounded-md w-full'
                required
              />
            </div>

            <textarea
              placeholder='Your Message'
              className='border border-gray-300 p-3 rounded-md w-full h-32 resize-none'
              required
            />

            <input
              type='text'
              placeholder='Gas Info (e.g. cylinder size, quantity, etc.)'
              className='border border-gray-300 p-3 rounded-md w-full'
            />

            {/* Image upload */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Upload an Image (optional)
              </label>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100'
              />
              {imagePreview && (
                <div className='mt-3'>
                  <Image
                    src={imagePreview}
                    alt='Preview'
                    className='h-32 rounded-lg border object-cover'
                  />
                </div>
              )}
            </div>

            <button
              type='submit'
              className='mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md font-medium transition'
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
