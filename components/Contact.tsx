'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { supabase } from '@/config/supabaseClient.config';
import { NigerianCities } from '@/constants';

const Contact = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    message: '',
    gas_info: '',
    state: '',
    city: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should not exceed 2MB.');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' && { city: '' }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let image_url = null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('contact')
        .upload(`contact-images/${fileName}`, imageFile);

      if (uploadError) {
        alert('Image upload failed');
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('contact')
        .getPublicUrl(`contact-images/${fileName}`);

      image_url = publicUrlData?.publicUrl;
    }

    const { error } = await supabase
      .from('contact_form')
      .insert([
        {
          full_name: formData.full_name,
          message: formData.message,
          gas_info: formData.gas_info,
          image_url: image_url,
          state: formData.state,
          city: formData.city,
        },
      ])
      .select()
      .single();

    if (error) {
      alert('Failed to submit. Please try again. ' + error.message);
      console.error('Error:', error);
    } else {
      setShowModal(true);
      setFormData({
        full_name: '',
        message: '',
        gas_info: '',
        state: '',
        city: '',
      });
      setImageFile(null);
      setImagePreview(null);
    }
  };

  return (
    <section id='contact' className='min-h-screen bg-white py-20 px-6'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-4xl font-bold mb-6 text-gray-900 text-center'>
          Contact <span className='text-primary'>Us</span>
        </h1>

        <div className='grid md:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            <p className='text-lg text-gray-700'>
              We are here to help with your gas delivery, product inquiries, or
              business partnerships.
            </p>
            <div className='space-y-2'>
              <p>
                <strong>📞 Phone:</strong> +234 812 345 6789
              </p>
              <p>
                <strong>📍 Address:</strong> Okporo Road, Port Harcourt, Nigeria
              </p>
              <p>
                <strong>✉️ Email:</strong> naijagasonline@gmail.com
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5 w-full'>
            <div className='grid grid-cols-1'>
              <input
                type='text'
                name='full_name'
                placeholder='Your Name'
                className='border border-gray-300 p-3 rounded-md w-full'
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name='message'
              placeholder='Your Message'
              className='border border-gray-300 p-3 rounded-md w-full h-32 resize-none'
              value={formData.message}
              onChange={handleChange}
              required
            />

            <input
              type='text'
              name='gas_info'
              placeholder='Gas Info (e.g. cylinder size, quantity, etc.)'
              className='border border-gray-300 p-3 rounded-md w-full'
              value={formData.gas_info}
              onChange={handleChange}
            />

            {/* State and City Select */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <select
                name='state'
                value={formData.state}
                onChange={handleChange}
                required
                className='border border-gray-300 p-3 rounded-md w-full bg-white text-gray-700'
              >
                <option value=''>Select State</option>
                {Object.keys(NigerianCities).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <select
                name='city'
                value={formData.city}
                onChange={handleChange}
                required
                disabled={!formData.state}
                className='border border-gray-300 p-3 rounded-md w-full bg-white text-gray-700'
              >
                <option value=''>Select City</option>
                {formData.state &&
                  NigerianCities[
                    formData.state as keyof typeof NigerianCities
                  ]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>

            {/* Image upload */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Upload an Image (optional)
              </label>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100'
              />
              {imagePreview && (
                <div className='mt-3'>
                  <Image
                    src={imagePreview}
                    alt='Preview'
                    width={150}
                    height={150}
                    className='h-32 rounded-lg border object-cover'
                  />
                </div>
              )}
            </div>

            <button
              type='submit'
              className='mt-4 w-full bg-primary bg-primary-hover text-white py-3 px-6 rounded-md font-medium transition'
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center'>
            <h2 className='text-2xl font-semibold mb-4 text-green-600'>
              🎉 Success!
            </h2>
            <p className='text-gray-700 mb-4'>
              Your inquiry has been submitted successfully.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
