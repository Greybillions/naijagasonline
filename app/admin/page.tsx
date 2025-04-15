'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabaseClient.config';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  price: number;
  image?: string;
};

const AdminPage = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // AUTH CHECK
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin) {
      setIsAdmin(true);
    } else {
      router.replace('/admin/login');
    }
  }, [router]);

  // FETCH PRODUCTS
  useEffect(() => {
    if (!isAdmin) return;

    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [isAdmin]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('Failed to delete product.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.replace('/admin/login');
  };

  if (!isAdmin || loading) {
    return <div className='p-6'>Loading...</div>;
  }

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Admin – Product Management</h1>
        <button
          onClick={handleLogout}
          className='text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700'
        >
          Logout
        </button>
      </div>

      <Link
        href='/admin/new'
        className='mb-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
      >
        Add New Product
      </Link>

      <div className='grid gap-4 mt-4'>
        {products.map((product) => (
          <div
            key={product.id}
            className='p-4 border rounded flex items-center justify-between'
          >
            <div className='flex items-center gap-4'>
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.title}
                  width={80}
                  height={80}
                  className='rounded object-cover'
                />
              )}
              <div>
                <h2 className='font-semibold'>{product.title}</h2>
                <p className='text-orange-600 font-medium'>
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className='flex gap-2'>
              <Link
                href={`/admin/edit/${product.id}`}
                className='text-blue-600 hover:underline'
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className='text-red-500 hover:underline'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
