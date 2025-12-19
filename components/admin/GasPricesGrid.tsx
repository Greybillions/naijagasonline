'use client';

import { useState } from 'react';
import { supabase } from '@/config/supabaseClient.config';
import { GasPrice } from '@/types';
import EditGasPriceModal from './ui/EditGasPriceModal';

type Props = {
  items: GasPrice[];
  onAdd: (row: GasPrice) => void;
  onUpdate: (id: number, next: { kg: string; amount: number }) => void;
  onDelete: (id: number) => void;
};

export default function GasPricesGrid({
  items,
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  const [editing, setEditing] = useState<GasPrice | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<GasPrice | null>(null);

  return (
    <>
      {/* Add button */}
      <div className='mb-3 flex justify-end'>
        <button
          onClick={() => setAdding(true)}
          className='rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700'
        >
          ➕ Add Gas Price
        </button>
      </div>

      {/* Table */}
      <div className='rounded-2xl border border-gray-100 bg-white shadow-sm'>
        <table className='w-full text-sm'>
          <thead className='bg-gray-50 text-gray-600'>
            <tr>
              <th className='px-4 py-3 text-left'>Gas Size</th>
              <th className='px-4 py-3 text-left'>Amount</th>
              <th className='px-4 py-3 text-left'>Last Updated</th>
              <th className='px-4 py-3 text-left'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((row) => (
              <tr key={row.id} className='border-t'>
                <td className='px-4 py-3 font-medium'>{row.kg}</td>

                <td className='px-4 py-3'>₦{row.amount.toLocaleString()}</td>

                <td className='px-4 py-3 text-gray-500'>
                  {new Date(row.created_at).toLocaleString()}
                </td>

                <td className='px-4 py-3 flex gap-2'>
                  <button
                    onClick={() => setEditing(row)}
                    className='rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700'
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleting(row)}
                    className='rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan={4} className='px-4 py-6 text-center text-gray-500'>
                  No gas prices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {editing && (
        <EditGasPriceModal
          row={editing}
          onClose={() => setEditing(null)}
          onSave={(next) => {
            onUpdate(editing.id, next);
            setEditing(null);
          }}
        />
      )}

      {/* Add modal */}
      {adding && (
        <AddGasPriceModal
          onClose={() => setAdding(false)}
          onAdd={(row) => {
            onAdd(row);
            setAdding(false);
          }}
        />
      )}

      {/* Delete modal */}
      {deleting && (
        <DeleteGasPriceModal
          row={deleting}
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            await supabase.from('gas_prices').delete().eq('id', deleting.id);
            onDelete(deleting.id);
            setDeleting(null);
          }}
        />
      )}
    </>
  );
}

/* ───────────────────────────────────────────── */
/* Add Modal */
/* ───────────────────────────────────────────── */

function AddGasPriceModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (row: GasPrice) => void;
}) {
  const [kg, setKg] = useState('');
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function generate4DigitId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  const save = async () => {
    const cleanKg = kg.trim();

    if (!cleanKg || !amount || Number(amount) <= 0) {
      setError('Gas size and amount must be valid');
      return;
    }

    setSaving(true);
    setError(null);

    let attempts = 0;
    let data: GasPrice | null = null;
    let lastError: string | null = null;

    while (attempts < 5 && !data) {
      const randomId = generate4DigitId();

      const res = await supabase
        .from('gas_prices')
        .insert({
          id: randomId, // 👈 custom 4-digit ID
          kg: cleanKg,
          amount: Number(amount),
        })
        .select()
        .single();

      if (!res.error) {
        data = res.data as GasPrice;
        break;
      }

      // duplicate key → retry
      if (res.error.code === '23505') {
        attempts++;
        continue;
      }

      lastError = res.error.message;
      break;
    }

    if (!data) {
      setError(
        lastError ?? 'Failed to generate a unique gas price ID. Try again.'
      );
      setSaving(false);
      return;
    }

    onAdd(data);
    setSaving(false);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl'>
        <h2 className='text-lg font-semibold'>Add Gas Price</h2>

        <div className='mt-4 space-y-3'>
          <div>
            <label className='block text-sm text-gray-600'>Gas Size</label>
            <input
              placeholder='e.g. 6kg, 12.5kg, 50kg'
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              className='w-full rounded-xl border px-3 py-2'
            />
          </div>

          <div>
            <label className='block text-sm text-gray-600'>Amount (₦)</label>
            <input
              type='number'
              inputMode='numeric'
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='w-full rounded-xl border px-3 py-2'
            />
          </div>

          {error && <p className='text-sm text-red-600'>{error}</p>}
        </div>

        <div className='mt-6 flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-100'
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={saving}
            className='rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700'
          >
            {saving ? 'Saving…' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/* Delete Modal */
/* ───────────────────────────────────────────── */

function DeleteGasPriceModal({
  row,
  onClose,
  onConfirm,
}: {
  row: GasPrice;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='w-full max-w-xs rounded-xl bg-white p-5 shadow-lg'>
        <h3 className='text-sm font-semibold'>Delete Gas Price?</h3>
        <p className='mt-2 text-sm text-gray-600'>
          {row.kg} — ₦{row.amount.toLocaleString()}
        </p>

        <div className='mt-4 flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100'
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className='rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
