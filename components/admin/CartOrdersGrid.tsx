'use client';
import { CartOrder } from '@/types';
import ConfirmModal from './ConfirmModal';
import { supabase } from '@/config/supabaseClient.config';
import { useState } from 'react';

export default function CartOrdersGrid({
  items, onStatus,
}:{ items: CartOrder[]; onStatus: (txRef: string)=>void }) {
  const [confirmTx, setConfirmTx] = useState<string|null>(null);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {items.length === 0 ? <p className="text-gray-500">No cart orders found.</p> :
          items.map((o, i) => (
            <div key={o.tx_ref} className="bg-white shadow rounded-lg p-5 hover:shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="font-medium">#{i + 1}</span>
                <span className={`text-xs px-2 py-1 rounded font-medium ${o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {o.status || 'pending'}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-semibold">Name:</span> {o.name}</p>
                <p><span className="font-semibold">Phone:</span> {o.phonenumber}</p>
                <p><span className="font-semibold">Address:</span> {o.address || 'N/A'}</p>
                <p><span className="font-semibold">Delivery:</span> {o.delivery_method}</p>
              </div>

              <div className="text-sm font-medium text-gray-800">
                Total: <span className="text-green-600">
                  ₦{o.product?.reduce((sum, it) => sum + (typeof it.total === 'number' ? it.total : 0), 0).toLocaleString()}
                </span>
              </div>

              <div>
                <p className="font-semibold text-sm text-gray-800 mb-1">Products:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {o.product?.map((it, idx) => (
                    <li key={idx}>{it.name} – {it.kg}kg × {it.quantity} = ₦{(typeof it.total==='number'?it.total:0).toLocaleString()}</li>
                  ))}
                </ul>
              </div>

              {o.status !== 'completed' && (
                <button onClick={() => setConfirmTx(o.tx_ref)} className="mt-3 self-start bg-green-500 hover:bg-green-700 text-white text-sm px-4 py-2 rounded">
                  ✅ Mark as Completed
                </button>
              )}
            </div>
        ))}
      </div>

      <ConfirmModal
        open={!!confirmTx}
        title="Mark as completed?"
        description="This cannot be undone."
        onClose={() => setConfirmTx(null)}
        onConfirm={async () => {
          if (!confirmTx) return;
          const { error } = await supabase.from('cart_order').update({ status: 'completed' }).eq('tx_ref', confirmTx);
          if (!error) { onStatus(confirmTx); setConfirmTx(null); } else alert('Failed to update status.');
        }}
      />
    </>
  );
}
