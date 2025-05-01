'use client';

import React from 'react';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  onConfirm,
  amount,
}) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-xl p-6 max-w-sm w-full'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
          Confirm Payment
        </h2>
        <p className='text-gray-600 mb-6'>
          You are about to pay{' '}
          <span className='font-semibold text-green-600'>
            ₦{amount.toLocaleString()}
          </span>{' '}
          for your order.
        </p>
        <div className='flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 border rounded hover:bg-gray-100'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
