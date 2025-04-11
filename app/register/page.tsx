'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Example register logic (replace with real API call)
    console.log('Registering:', { name, email, password });
    alert('Registration successful');
    router.push('/login');
  };

  return (
    <section className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
      <form
        onSubmit={handleRegister}
        className='bg-white shadow-md rounded-lg p-6 w-full max-w-md'
      >
        <h1 className='text-2xl font-semibold text-center mb-6'>
          Create your account
        </h1>

        <label className='block mb-2 text-sm font-medium text-gray-700'>
          Full Name
        </label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-sm'
          placeholder='John Doe'
        />

        <label className='block mb-2 text-sm font-medium text-gray-700'>
          Email
        </label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-sm'
          placeholder='you@example.com'
        />

        <label className='block mb-2 text-sm font-medium text-gray-700'>
          Password
        </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md mb-6 text-sm'
          placeholder='Enter a secure password'
        />

        <button
          type='submit'
          className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition'
        >
          Register
        </button>

        <p className='text-sm text-center text-gray-500 mt-4'>
          Already have an account?{' '}
          <a href='/login' className='text-orange-500 hover:underline'>
            Login
          </a>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
