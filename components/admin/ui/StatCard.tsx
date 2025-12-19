type Props = {
  label: string;
  value: string | number;
  hint?: string;
};

export default function StatCard({ label, value, hint }: Props) {
  return (
    <div className='rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
      <div className='text-xs uppercase tracking-wide text-gray-500'>
        {label}
      </div>
      <div className='mt-1 text-2xl font-semibold text-gray-900'>{value}</div>
      {hint && <div className='mt-1 text-xs text-gray-500'>{hint}</div>}
    </div>
  );
}
