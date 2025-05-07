'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  delivery_method: string;
}

const PaymentSuccessClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const txRef = searchParams.get('tx_ref');
  const { clearCart } = useCart();

  const [status, setStatus] = useState('🔄 Verifying your payment...');
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
        .maybeSingle();

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

  const handleBackHome = () => {
    router.push('/');
  };

  const formatDate = (date?: string) => {
    if (!date) return '';
    return new Date(date).toLocaleString();
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-50 text-center'>
      <h1 className='text-3xl font-bold text-green-600 mb-2'>Payment Status</h1>
      <p className='text-lg text-gray-700 mb-6'>{status}</p>

      {order && (
        <>
          <div
            ref={receiptRef}
            className='bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-left print:shadow-none print:p-0 print:max-w-full'
          >
            <h2 className='text-2xl font-semibold text-center text-gray-800 mb-4'>
              NaijaGasOnline Receipt
            </h2>
            <div className='space-y-2 text-sm'>
              <p>
                <strong>TX Ref:</strong> {order.tx_ref}
              </p>
              <p>
                <strong>Delivery Option:</strong> {order.delivery_method}
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
            </div>

            <div className='mt-4'>
              <p className='font-semibold text-sm mb-1'>Products:</p>
              <ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
                {order.product.map((item, i) => (
                  <li key={i}>
                    {item.name} - {item.kg}kg x {item.quantity} = ₦
                    {item.total.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
            <p className='mt-4 text-lg font-semibold text-gray-800 text-center'>
              Total Amount: ₦
              {order.product
                .reduce((acc, item) => acc + item.total, 0)
                .toLocaleString()}
            </p>
          </div>

          <div className='mt-8 flex flex-col sm:flex-row gap-4 print:hidden'>
            <button
              onClick={handlePrint}
              className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium'
            >
              🖨️ Print Receipt
            </button>
            <button
              onClick={handleBackHome}
              className='bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition font-medium'
            >
              ⬅️ Back to Home
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentSuccessClient;
