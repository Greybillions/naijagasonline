'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/config/supabaseClient.config';
import Image from 'next/image';
import { Product } from '@/types'; // 👈 Make sure you have Product type

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error.message);
      } else if (data) {
        setProduct(data as Product);
        setFormData({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          price: data.price.toString(),
          rating: data.rating.toString(),
          kg: data.kg,
          phone: data.phone,
          state: data.state,
          city: data.city,
        });
        if (data.image) {
          setImagePreview(data.image);
        }
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

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
    if (!product) return;
    setSaving(true);

    let imageUrl = product.image;

    if (imageFile) {
      if (imageFile.size > 2 * 1024 * 1024) {
        alert('File too large. Please upload an image under 2MB.');
        setSaving(false);
        return;
      }

      const fileName = `${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(`admin-products/${fileName}`, imageFile, {
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError.message);
        alert('Image upload failed: ' + uploadError.message);
        setSaving(false);
        return;
      }

      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/admin-products/${fileName}`;
    }

    const { error } = await supabase
      .from('products')
      .update({
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        image: imageUrl,
      })
      .eq('id', id);

    if (error) {
      alert('Failed to update product');
    } else {
      router.push('/admin');
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className='p-6 flex items-center justify-center min-h-[200px]'>
        <p className='text-gray-600'>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='p-6 flex items-center justify-center min-h-[200px]'>
        <p className='text-red-500 font-medium'>Product not found.</p>
      </div>
    );
  }

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6 text-center'>
        Edit <span className='text-green-700'>Product</span>
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

        {/* Image Upload */}
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-2'>Product Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='border border-gray-300 rounded-md px-3 py-2 text-sm'
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
          disabled={saving}
          className='bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50'
        >
          {saving ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
