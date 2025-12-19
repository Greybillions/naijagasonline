'use client';

import { useState } from 'react';
import { supabase } from '@/config/supabaseClient.config';
import { GasPrice } from '@/types';

type Props = {
  row: GasPrice;
  onClose: () => void;
  onSave: (next: { kg: string; amount: number }) => void;
};

export default function EditGasPriceModal({ row, onClose, onSave }: Props) {
  const [kg, setKg] = useState<string>(row.kg);
  const [amount, setAmount] = useState<number | ''>(row.amount);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    const cleanKg = kg.trim();

    if (!cleanKg) {
      setError('Gas size is required');
      return;
    }

    if (amount === '' || amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from('gas_prices')
      .update({
        kg: cleanKg,
        amount,
      })
      .eq('id', row.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    onSave({ kg: cleanKg, amount });
    setSaving(false);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl'>
        {/* Header */}
        <h2 className='text-lg font-semibold'>Edit Gas Price</h2>

        {/* Form */}
        <div className='mt-4 space-y-4'>
          {/* Gas size */}
          <div>
            <label className='block text-sm text-gray-600'>Gas Size</label>
            <input
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              placeholder='e.g. 12.5kg'
              className='w-full rounded-xl border border-gray-200 px-3 py-2
                         focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100'
            />
          </div>

          {/* Amount */}
          <div>
            <label className='block text-sm text-gray-600'>Amount (₦)</label>
            <input
              type='number'
              inputMode='numeric'
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value === '' ? '' : Number(e.target.value))
              }
              placeholder='Enter amount'
              className='w-full rounded-xl border border-gray-200 px-3 py-2
                         focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100'
            />
          </div>

          {error && <p className='text-sm text-red-600'>{error}</p>}
        </div>

        {/* Actions */}
        <div className='mt-6 flex justify-end gap-2'>
          <button
            onClick={onClose}
            disabled={saving}
            className='rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-100'
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={saving}
            className='rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
