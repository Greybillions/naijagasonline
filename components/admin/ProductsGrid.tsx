'use client';
import Image from 'next/image';
import Link from 'next/link';
import ConfirmModal from './ConfirmModal';
import { Product } from '@/types';
import { supabase } from '@/config/supabaseClient.config';
import { useState } from 'react';

export default function ProductsGrid({
  items, onDeleted,
}:{ items: Product[]; onDeleted: (id: string)=>void }) {
  const [deleteId, setDeleteId] = useState<string|null>(null);

  return (
    <>
      <Link
        href="/admin/addNewProduct"
        className="mb-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow"
      >
        ➕ Add New Product
      </Link>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {items.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : items.map((p, i) => (
          <div key={p.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-black text-sm">{i + 1}</span>
              {p.image && (
                <Image src={p.image} alt={p.title} width={80} height={80}
                  className="rounded-md object-cover border border-gray-200" />
              )}
              <div>
                <h2 className="font-semibold text-lg text-gray-800">{p.title}</h2>
                <p className="text-orange-600 font-medium text-sm">₦{p.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <Link href={`/admin/edit/${p.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">✏️ Edit</Link>
              <button onClick={() => setDeleteId(p.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="Confirm Deletion"
        description="This action cannot be undone."
        confirmText="Delete"
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          if (!deleteId) return;
          const { error } = await supabase.from('products').delete().eq('id', deleteId);
          if (!error) { onDeleted(deleteId); setDeleteId(null); }
          else alert('Failed to delete product.');
        }}
      />
    </>
  );
}
