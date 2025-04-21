'use client';

import React, { useState } from 'react';
import { supabase } from '@/config/supabaseClient.config';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AddNewProduct = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    price: '',
    rating: '4.5',
    kg: '',
    phone: '',
    state: '',
    city: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = '';

    if (imageFile) {
      if (imageFile.size > 2 * 1024 * 1024) {
        alert('File too large. Please upload an image under 2MB.');
        setLoading(false);
        return;
      }

      const fileName = `${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(`admin-products/${fileName}`, imageFile);

      if (uploadError) {
        console.error('Upload error:', uploadError.message);
        alert('Image upload failed: ' + uploadError.message);
        setLoading(false);
        return;
      }

      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/admin-products/${fileName}`;
    }

    const { error } = await supabase.from('products').insert({
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      seller_name: 'admin',
      image: imageUrl,
    });

    if (error) {
      alert('Failed to add product');
    } else {
      router.push('/admin');
    }

    setLoading(false);
  };

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6 text-center'>
        Add New <span className='text-orange-500'>Product</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 gap-5 bg-white p-6 rounded-xl shadow'
      >
        <input
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Title'
          className='border border-gray-300 rounded-md px-4 py-2 text-sm'
          required
        />
        <input
          name='subtitle'
          value={formData.subtitle}
          onChange={handleChange}
          placeholder='Subtitle'
          className='border border-gray-300 rounded-md px-4 py-2 text-sm'
          required
        />
        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
          className='border border-gray-300 rounded-md px-4 py-2 text-sm'
          rows={3}
          required
        />
        <input
          name='price'
          value={formData.price}
          onChange={handleChange}
          type='number'
          placeholder='Price (₦)'
          className='border border-gray-300 rounded-md px-4 py-2 text-sm'
          required
        />
        <select
          name='kg'
          value={formData.kg}
          onChange={handleChange}
          className='border border-gray-300 rounded-md px-4 py-2 text-sm'
          required
        >
          <option value=''>Select KG</option>
          <option value='3'>3kg</option>
          <option value='6'>6kg</option>
          <option value='10'>10kg</option>
          <option value='12.5'>12.5kg</option>
          <option value='18'>18kg</option>
          <option value='25'>25kg</option>
        </select>
        <select
          name='rating'
          value={formData.rating}
          onChange={handleChange}
          className='border border-gray-300 rounded-md px-4 py-2 text-sm'
        >
          <option value='4.5'>4.5</option>
          <option value='4.3'>4.3</option>
          <option value='4.0'>4.0</option>
        </select>
        <input
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone Number'
          className='border border-gray-300 rounded-md px-4 py-2 text-sm'
          required
        />
        <input
          name='state'
          value={formData.state}
          onChange={handleChange}
          placeholder='State'
          className='border border-gray-300 rounded-md px-4 py-2 text-sm'
          required
        />
        <input
          name='city'
          value={formData.city}
          onChange={handleChange}
          placeholder='City'
          className='border border-gray-300 rounded-md px-4 py-2 text-sm'
          required
        />

        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-2'>Product Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='border border-gray-300 rounded-md px-3 py-2 text-sm'
            required={!imageFile}
          />
          {imagePreview && (
            <div className='relative mt-4 w-fit'>
              <Image
                width={80}
                height={80}
                src={imagePreview}
                alt='Preview'
                className='w-40 h-40 object-cover rounded-md border'
              />
              <button
                type='button'
                onClick={handleRemoveImage}
                className='absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-md hover:bg-red-600'
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <button
          type='submit'
          disabled={loading}
          className='bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition'
        >
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
