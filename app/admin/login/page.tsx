'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (
      email.trim() === adminEmail?.trim() &&
      password.trim() === adminPassword?.trim()
    ) {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-8 rounded shadow-md w-full max-w-md'
      >
        <h1 className='text-2xl font-bold mb-6'>Admin Login</h1>

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <label className='block mb-2 font-medium'>Email</label>
        <input
          type='email'
          className='w-full p-2 border rounded mb-4'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className='block mb-2 font-medium'>Password</label>
        <input
          type='password'
          className='w-full p-2 border rounded mb-6'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type='submit'
          className='w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
