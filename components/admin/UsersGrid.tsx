'use client';
import { User } from '@/types';

export default function UsersGrid({ items }:{ items: User[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {items.length === 0 ? <p className="text-gray-500">No users found.</p> :
        items.map((u, i) => (
          <div key={u.id} className="bg-white shadow rounded-lg p-5 flex justify-between items-start hover:shadow-md">
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-1">
                <span className="text-black font-medium mr-2">{i + 1}.</span>{u.full_name}
              </p>
              <p className="text-sm text-gray-600">📞 {u.phone}</p>
            </div>
            <div className="text-sm text-right text-gray-600">
              <p>{u.city}</p><p>{u.state}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}
