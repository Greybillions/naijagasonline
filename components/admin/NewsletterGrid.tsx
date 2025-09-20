'use client';
import { NewsletterSubscriber } from '@/types';

export default function NewsletterGrid({ items }:{ items: NewsletterSubscriber[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {items.length === 0 ? <p className="text-gray-500">No subscribers yet.</p> :
        items.map((s, i) => (
          <div key={s.id} className="bg-white rounded-lg shadow p-5 hover:shadow-md flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-black font-medium">{i + 1}</span>
              <p className="text-sm text-gray-700 font-medium break-words">{s.email}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}
