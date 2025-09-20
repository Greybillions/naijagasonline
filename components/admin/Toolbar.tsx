'use client';
import { AdminTab } from '@/hooks/useAdminData';
import { exportToCSV } from '@/utils/export';

export default function Toolbar({
  activeTab, total, data,
}:{ activeTab: AdminTab; total: number; data: Record<string, unknown>[] }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 p-4 bg-white shadow rounded-lg">
      <span className="text-sm text-gray-700 font-medium">
        Total: <span className="font-semibold text-gray-900">{total}</span>
      </span>
      <button
        onClick={() => exportToCSV(data, activeTab)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium shadow-md"
      >
        ⬇ Download CSV
      </button>
    </div>
  );
}
