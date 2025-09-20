'use client';
import { ContactForm } from '@/types';

export default function ContactFormsGrid({ items }:{ items: ContactForm[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {items.length === 0 ? <p className="text-gray-500">No contact form submissions yet.</p> :
        items.map((it, i) => (
          <div key={it.id} className="bg-white shadow rounded-lg p-5 hover:shadow-md flex flex-col gap-2">
            <div className="flex justify-between text-sm text-black">
              <span className="font-medium">{i + 1}</span>
              <span>📍 {it.city}, {it.state}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{it.full_name}</h2>
            {it.message && (
              <div className="text-sm text-gray-700">
                <p className="font-medium">Message:</p>
                <p className="whitespace-pre-line">{it.message}</p>
              </div>
            )}
            {it.gas_info && <p className="text-sm text-gray-600"><span className="font-medium">Gas Info:</span> {it.gas_info}</p>}
            {it.image_url && (
              <a href={it.image_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm underline mt-1 inline-block">
                🔍 View Uploaded Image
              </a>
            )}
            <p className="text-xs text-gray-500 mt-2">🗓 {new Date(it.created_at).toLocaleDateString()}</p>
          </div>
        ))
      }
    </div>
  );
}
