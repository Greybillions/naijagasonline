'use client';

import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

interface FlutterwaveProps {
  amount: number;
  name: string;
  email: string;
  phone: string;
  txRef: string; // ✅ receive tx_ref from parent
  onSuccess: (txRef: string) => void; // ✅ pass it back on success
}

interface FlutterwaveResponse {
  success: boolean;
  transaction_id: number;
  tx_ref: string;
  status: string;
}

const FlutterwavePayment: React.FC<FlutterwaveProps> = ({
  amount,
  name,
  email,
  phone,
  txRef,
  onSuccess,
}) => {
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: txRef, // ✅ use passed tx_ref
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
      email: 'naijagasonline@gmail.com',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave',
    callback: (response: FlutterwaveResponse) => {
      console.log('Payment successful!', response);
      closePaymentModal();
      onSuccess(txRef); // ✅ pass tx_ref back to caller
      window.location.href = `/payment-success?tx_ref=${txRef}`; // ✅ append to URL
    },
    onClose: () => {
      console.log('Payment closed');
    },
  };

  return (
    <FlutterWaveButton
      className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition'
      {...fwConfig}
    />
  );
};

export default FlutterwavePayment;
