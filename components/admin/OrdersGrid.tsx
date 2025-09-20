'use client';
import { Order } from '@/types';
import ConfirmModal from './ConfirmModal';
import { supabase } from '@/config/supabaseClient.config';
import { useState } from 'react';

export default function OrdersGrid({
  items, onStatus,
}:{ items: Order[]; onStatus: (id: string)=>void }) {
  const [confirmId, setConfirmId] = useState<string|null>(null);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {items.length === 0 ? <p className="text-gray-500">No orders found.</p> :
          items.map((o, i) => (
            <div key={o.id} className="bg-white rounded-lg shadow p-5 flex flex-col justify-between hover:shadow-md">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium text-sm">{i + 1}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${o.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {o.status || 'Pending'}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{o.full_name}</h2>
                <p className="text-sm text-gray-600">📞 {o.phone}</p>
                <p className="text-sm text-gray-600">Kg: {o.kg}</p>
                <p className="text-sm text-gray-600">Total: ₦{o.price.toLocaleString()}</p>
                <div className="text-sm text-gray-600">
                  <p>📍 {o.city}, {o.state}</p>
                  <p>📬 {o.address || 'N/A'}</p>
                </div>
                <p className="text-sm text-gray-600">🗓️ {new Date(o.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">🚚 {o.delivery_option}</p>
              </div>
              {o.status !== 'completed' && (
                <button onClick={() => setConfirmId(o.id)} className="mt-4 bg-green-500 hover:bg-green-700 text-white text-sm px-4 py-2 rounded self-start">
                  ✅ Mark as Completed
                </button>
              )}
            </div>
        ))}
      </div>

      <ConfirmModal
        open={!!confirmId}
        title="Mark as completed?"
        description="This cannot be undone."
        onClose={() => setConfirmId(null)}
        onConfirm={async () => {
          if (!confirmId) return;
          const { error } = await supabase.from('orders').update({ status: 'completed' }).eq('id', confirmId);
          if (!error) { onStatus(confirmId); setConfirmId(null); } else alert('Failed to update status.');
        }}
      />
    </>
  );
}
