'use client';
import { JoinRequest } from '@/types';

export default function JoinRequestsGrid({ items }:{ items: JoinRequest[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {items.length === 0 ? <p className="text-gray-500">No join requests.</p> :
        items.map((r, i) => (
          <div key={r.id} className="bg-white rounded-lg shadow p-5 hover:shadow-md flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm text-black">
              <span className="font-medium">{i + 1}</span>
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{r.role}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{r.full_name}</h2>
            <p className="text-sm text-gray-700">📞 {r.phone}</p>
            <p className="text-sm text-gray-600">📍 {r.city}, {r.state}</p>
            {r.message && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">Message:</p>
                <p className="whitespace-pre-line">{r.message}</p>
              </div>
            )}
          </div>
        ))
      }
    </div>
  );
}
