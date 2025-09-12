'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/config/supabaseClient.config';
import type { PostgrestError } from '@supabase/supabase-js';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }
    setStatus('loading');
    setMessage('');

    const { error } = await supabase
      .from('waitlist')
      .upsert({ email }, { onConflict: 'email' });

    if (error) {
      const err = error as PostgrestError;
      console.error('[Waitlist upsert error]', {
        message: err.message,
        details: err.details,
        hint: err.hint,
        code: err.code,
      });

      // Fallback: check-then-insert
      const { data: existing, error: selErr } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (selErr) {
        const sel = selErr as PostgrestError;
        setStatus('error');
        setMessage(sel.message || 'Could not save email. Try again.');
        return;
      }

      if (!existing) {
        const { error: insErr } = await supabase
          .from('waitlist')
          .insert({ email });
        if (insErr) {
          const ins = insErr as PostgrestError;
          setStatus('error');
          setMessage(ins.message || 'Could not save email. Try again.');
          return;
        }
      }
    }

    setStatus('success');
    setMessage("You're on the list! We'll be in touch soon.");
    setEmail('');
  }

  return (
    <div className='min-h-dvh px-6 bg-gradient-to-b from-[#0b5037] via-[#0a6848] to-[#093c2b] text-white'>
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        {/* Subtle green ambience */}
        <motion.div
          className='absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#22c55e]/20 blur-3xl'
          animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className='absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#10b981]/20 blur-3xl'
          animate={{ y: [0, -12, 0], x: [0, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px] opacity-30'
        />
      </div>

      <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <section className='flex min-h-dvh flex-col items-center justify-center py-12'>
          <div className='grid w-full items-center gap-10 md:gap-30  lg:grid-cols-2'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className='space-y-6'
            >
              <h1 className='font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl'>
                Be first to try{' '}
                <span className='bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>
                  NaijaGasOnline
                </span>
              </h1>

              <span className='inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur'>
                🔒 Your email stays private
              </span>

              <p className='max-w-prose text-white/85'>
                Get cooking gas delivered to your doorstep faster and cheaper.
                Join the waitlist for early access to NaijaGasOnline Mobile App
                perks when we launch.
              </p>

              <form
                onSubmit={onSubmit}
                className='relative mt-4'
                aria-label='Join waitlist'
              >
                <div className='flex w-full flex-col gap-3 sm:flex-row'>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type='email'
                    inputMode='email'
                    autoComplete='email'
                    required
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='h-12 w-full rounded-2xl border border-white/20 bg-white/10 px-4 text-base text-white placeholder-white/60 outline-none transition focus:border-white focus:ring-2 focus:ring-white/30'
                    aria-label='Email address'
                  />

                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'loading'}
                    className='inline-flex h-12 items-center justify-center whitespace-nowrap rounded-2xl bg-white px-6 font-medium text-[#005b3d] shadow-lg shadow-black/20 disabled:opacity-70'
                    type='submit'
                    aria-live='polite'
                  >
                    {status === 'loading' ? (
                      <span className='inline-flex items-center gap-2'>
                        <Spinner /> Submitting…
                      </span>
                    ) : (
                      'Join Waitlist'
                    )}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {status !== 'idle' && (
                    <motion.p
                      key={status + message}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className={`mt-3 text-sm ${
                        status === 'success'
                          ? 'text-emerald-300'
                          : status === 'error'
                          ? 'text-red-300'
                          : 'text-white/80'
                      }`}
                      role='status'
                    >
                      {message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Preview card (glass + green gradient) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className='relative mx-auto md:w-[300px] w-[250px] max-w-xl'
              aria-hidden
            >
              <div className='relative rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl'>
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='inline-block h-2.5 w-2.5 rounded-full bg-[#006f47]' />
                    <span className='inline-block h-2.5 w-2.5 rounded-full bg-[#005b3d]' />
                  </div>
                  <span className='text-xs text-white/70'>preview</span>
                </div>

                <video
                  className='w-full h-auto rounded-xl'
                  loop
                  autoPlay
                  muted
                  playsInline
                  preload='metadata'
                >
                  <source src='/video/waitlist.mp4' type='video/mp4' />
                </video>

                <motion.div
                  className='absolute -right-6 -top-6 rounded-2xl border border-white/30 bg-white/10 px-3 py-2 text-xs text-white shadow'
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Early access
                </motion.div>

                <motion.div
                  className='absolute -bottom-6 -left-6 rounded-2xl border border-white/30 bg-white/10 px-3 py-2 text-xs text-white shadow'
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 2.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Insider updates
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className='size-4 animate-spin'
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
      />
    </svg>
  );
}
