'use client';

import React from 'react';

interface FlutterwaveProps {
  amount: number;
  name: string;
  email: string;
  phone: string;
  txRef: string;
  onSuccess: (txRef: string) => void;
}

interface FlutterwaveResponse {
  status: string;
  transaction_id: number;
  tx_ref: string;
  [key: string]: unknown;
}

// Declare FlutterwaveCheckout on window
declare global {
  interface Window {
    FlutterwaveCheckout: (options: Record<string, unknown>) => void;
  }
}

const FlutterwavePayment: React.FC<FlutterwaveProps> = ({
  amount,
  name,
  email,
  phone,
  txRef,
  onSuccess,
}) => {
  const handlePayment = () => {
    if (!document.querySelector('#flutterwave-checkout-script')) {
      const script = document.createElement('script');
      script.src = 'https://checkout.flutterwave.com/v3.js';
      script.id = 'flutterwave-checkout-script';
      script.async = true;
      document.body.appendChild(script);

      script.onload = triggerCheckout;
    } else {
      triggerCheckout();
    }
  };

  const triggerCheckout = () => {
    window.FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
      tx_ref: txRef,
      amount,
      currency: 'NGN',
      payment_options: 'card, banktransfer, ussd',
      customer: {
        email,
        phonenumber: phone,
        name,
      },
      customizations: {
        title: 'NaijaGasOnline',
        description: 'Payment for gas order',
        logo: 'https://rqtzkqkdegwmnmkeyzjs.supabase.co/storage/v1/object/public/product-images/logo/cropped_image.png',
      },
      callback: (response: FlutterwaveResponse) => {
        console.log('Flutterwave response:', response);

        if (['successful', 'completed'].includes(response.status)) {
          onSuccess(response.tx_ref);
          window.location.href = `/payment-success?tx_ref=${response.tx_ref}`;
        } else {
          console.warn(`❌ Payment not successful. Status: ${response.status}`);
        }
      },
      onclose: () => {
        console.log('💬 Flutterwave payment modal closed by user');
      },
    });
  };

  return (
    <button
      onClick={handlePayment}
      className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition'
    >
      Pay with Flutterwave
    </button>
  );
};

export default FlutterwavePayment;
