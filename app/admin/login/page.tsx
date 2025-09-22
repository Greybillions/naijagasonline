'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim();
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // basic client-side validation
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    if (!adminEmail || !adminPassword) {
      setError('Admin credentials are not configured.');
      return;
    }

    setLoading(true);
    try {
      const ok =
        email.trim().toLowerCase() === adminEmail.toLowerCase() &&
        password.trim() === adminPassword;

      if (ok) {
        localStorage.setItem('isAdmin', 'true');
        router.push('/admin');
      } else {
        setError('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-md'>
        <div className='mb-8 text-center'>
          <div className='mx-auto h-12 w-12 rounded-2xl bg-green-600/10 flex items-center justify-center'>
            <span className='text-2xl'>👤</span>
          </div>
          <h1 className='mt-4 text-2xl font-bold tracking-tight text-gray-900'>
            Admin Login
          </h1>
          <p className='mt-1 text-sm text-gray-500'>
            Sign in to access the dashboard
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className='bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8'
        >
          {error && (
            <div className='mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>
              {error}
            </div>
          )}

          <div className='mb-5'>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <div className='relative'>
              <input
                id='email'
                type='email'
                autoComplete='email'
                className='w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-300 transition'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                required
                aria-invalid={!!error}
              />
              <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400'>
                @
              </span>
            </div>
          </div>

          <div className='mb-6'>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <div className='relative'>
              <input
                id='password'
                type={showPw ? 'text' : 'password'}
                autoComplete='current-password'
                className='w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-12 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-300 transition'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                required
              />
              <button
                type='button'
                onClick={() => setShowPw((s) => !s)}
                className='absolute inset-y-0 right-2 rounded-md px-2 text-xs text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-200'
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className='mt-2 flex items-center justify-between'>
              <label className='inline-flex items-center gap-2 text-sm text-gray-600'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-orange-500'
                  onChange={(e) => {
                    // optional: persistent admin on this device
                    if (!e.target.checked) localStorage.removeItem('isAdmin');
                  }}
                />
                Remember this device
              </label>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='relative w-full overflow-hidden rounded-xl bg-green-600 py-2.5 text-white font-medium shadow-lg shadow-orange-600/20 transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-60'
          >
            {loading ? (
              <span className='inline-flex items-center justify-center gap-2'>
                <svg
                  className='h-4 w-4 animate-spin'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <circle
                    className='opacity-20'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-80'
                    d='M22 12a10 10 0 0 1-10 10'
                    stroke='currentColor'
                    strokeWidth='4'
                    strokeLinecap='round'
                  />
                </svg>
                Signing in…
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className='mt-6 text-center text-xs text-gray-400'>
          © {new Date().getFullYear()} NaijaGasOnline. All rights reserved.
        </p>
      </div>
    </div>
  );
}
