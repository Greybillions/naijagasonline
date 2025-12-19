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
  phonenumber: string;
  address: string;
  tx_ref: string;
  product: ProductItem[];
  created_at?: string;
  delivery_method: string;
  payment_mode?: string;
}

export default function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const txRef = searchParams.get('tx_ref');
  const { clearCart } = useCart();

  const [status, setStatus] = useState('🔄 Fetching your order details...');
  const [order, setOrder] = useState<Order | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!txRef) {
        setStatus('❌ No order reference found.');
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

      setOrder(data as Order);
      setStatus(
        '✅ Order placed successfully! Our team will contact you shortly.'
      );
      clearCart();
    };

    fetchOrder();
  }, [txRef, clearCart]);

  const handlePrint = () => window.print();
  const handleBackHome = () => router.push('/');

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleString() : '';

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-50'>
      <h1 className='text-3xl font-bold text-green-600 mb-2'>
        Order Confirmation
      </h1>

      <p className='text-lg text-gray-700 mb-6 text-center max-w-md'>
        {status}
      </p>

      {order && (
        <>
          {/* Receipt */}
          <div
            ref={receiptRef}
            className='bg-white rounded-2xl shadow-lg p-6 w-full max-w-md print:shadow-none print:p-0'
          >
            <h2 className='text-2xl font-semibold text-center mb-4'>
              NaijaGasOnline Receipt
            </h2>

            <div className='space-y-2 text-sm'>
              <p>
                <strong>Order Ref:</strong> {order.tx_ref}
              </p>

              <p>
                <strong>Order Date:</strong> {formatDate(order.created_at)}
              </p>

              <p>
                <strong>Delivery Method:</strong>{' '}
                {order.delivery_method === 'pickup'
                  ? 'Pickup'
                  : 'Doorstep Delivery'}
              </p>

              <p>
                <strong>Payment Mode:</strong>{' '}
                {order.payment_mode === 'payment_on_delivery'
                  ? 'Payment on Delivery'
                  : '—'}
              </p>

              <p>
                <strong>Name:</strong> {order.name}
              </p>

              <p>
                <strong>Phone:</strong> {order.phonenumber}
              </p>

              <p>
                <strong>Address:</strong> {order.address}
              </p>
            </div>

            <div className='mt-4'>
              <p className='font-semibold text-sm mb-1'>Items:</p>
              <ul className='list-disc list-inside text-sm space-y-1'>
                {order.product.map((item, i) => (
                  <li key={i}>
                    {item.name} ({item.kg}kg) × {item.quantity} — ₦
                    {item.total.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>

            <p className='mt-4 text-lg font-semibold text-center'>
              Total Amount: ₦
              {order.product
                .reduce((acc, item) => acc + item.total, 0)
                .toLocaleString()}
            </p>

            <p className='mt-4 text-xs text-gray-500 text-center'>
              Please keep this receipt for reference.
            </p>
          </div>

          {/* Actions */}
          <div className='mt-8 flex flex-col sm:flex-row gap-4 print:hidden'>
            <button
              onClick={handlePrint}
              className='rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700'
            >
              🖨️ Print Receipt
            </button>

            <button
              onClick={handleBackHome}
              className='rounded-lg bg-gray-800 px-6 py-3 text-white font-medium hover:bg-gray-900'
            >
              ⬅️ Back to Home
            </button>
          </div>
        </>
      )}
    </div>
  );
}
