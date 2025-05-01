'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/config/supabaseClient.config';

interface ProductItem {
  name: string;
  kg: string;
  price: number;
  quantity: number;
  total: number;
}

interface Order {
  name: string;
  email: string;
  phonenumber: string;
  address: string;
  tx_ref: string;
  product: ProductItem[];
  created_at?: string;
}

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const txRef = searchParams.get('tx_ref');
  const { clearCart } = useCart();

  const [status, setStatus] = useState('Verifying your payment...');
  const [order, setOrder] = useState<Order | null>(null);

  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!txRef) {
        setStatus('❌ No payment reference found.');
        return;
      }

      const { data, error } = await supabase
        .from('cart_order')
        .select('*')
        .eq('tx_ref', txRef)
        .maybeSingle(); // ✅ safer than .single()

      if (error) {
        console.error('Order fetch error:', error.message);
        setStatus('❌ Unable to fetch your order.');
        return;
      }

      if (!data) {
        setStatus('❌ No order found for this reference.');
        return;
      }

      setOrder(data);
      setStatus('✅ Payment Successful! Your order has been recorded.');
      clearCart();
    };

    fetchOrder();
  }, [txRef, clearCart]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date?: string) => {
    if (!date) return '';
    return new Date(date).toLocaleString();
  };

  return (
    <div className='min-h-screen flex flex-col items-center px-4 text-center py-10'>
      <h1 className='text-3xl font-bold text-green-600 mb-4'>Payment Status</h1>
      <p className='text-lg text-gray-700 mb-6'>{status}</p>

      {order && (
        <>
          <div
            ref={receiptRef}
            className='text-left bg-white shadow p-6 rounded max-w-md w-full print:shadow-none print:p-0 print:max-w-full'
          >
            <h2 className='text-2xl font-semibold text-center mb-4'>
              NaijaGasOnline Receipt
            </h2>
            <p>
              <strong>TX Ref:</strong> {order.tx_ref}
            </p>
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Phone:</strong> {order.phonenumber}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(order.created_at)}
            </p>

            <p className='mt-4 font-semibold'>Products:</p>
            <ul className='list-disc list-inside'>
              {order.product.map((item, i) => (
                <li key={i}>
                  {item.name} - {item.kg}kg x {item.quantity} = ₦
                  {item.total.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-6 flex gap-4 print:hidden'>
            <button
              onClick={handlePrint}
              className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              🖨️ Print Receipt
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
