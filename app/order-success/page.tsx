import React, { Suspense } from 'react';
import PaymentSuccessClient from './OrderSuccess';

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
