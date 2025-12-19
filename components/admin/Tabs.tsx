'use client';
import type { AdminTab } from '@/hooks/useAdminData';

export default function Tabs({
  value,
  onChange,
}: {
  value: AdminTab;
  onChange: (v: AdminTab) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as AdminTab)}
      className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary'
    >
      <option value='products'>🛍 Products</option>
      <option value='users'>👥 Users</option>
      <option value='orders'>📦 Orders</option>
      <option value='cart_order'>🛒 Cart Orders</option>
      <option value='join_requests'>🤝 Join Requests</option>
      <option value='newsletter_subscribers'>📧 Newsletter Subscribers</option>
      <option value='contact_forms'>💬 Contact Submissions</option>
      <option value='gas_prices'>⛽ Gas Prices</option>
    </select>
  );
}
