import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const PaymentSuccessClient = dynamic(() => import('./PaymentSuccessClient'), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center'>
          Loading...
        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}
