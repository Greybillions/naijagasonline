import StatCard from './ui/StatCard';

type AdminStatsData = {
  products: number;
  orders: number;
  pendingOrders: number;
  completedOrders: number;
  cartOrders: number;
  pendingCart: number;
  completedCart: number;
  subscribers: number;
};

type Props = {
  stats: AdminStatsData;
};

export default function AdminStats({ stats }: Props) {
  return (
    <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
      <StatCard label='Products' value={stats.products} />

      <StatCard
        label='Orders'
        value={stats.orders}
        hint={`${stats.pendingOrders} pending • ${stats.completedOrders} done`}
      />

      <StatCard
        label='Cart Orders'
        value={stats.cartOrders}
        hint={`${stats.pendingCart} pending • ${stats.completedCart} done`}
      />

      <StatCard label='Subscribers' value={stats.subscribers} />
    </div>
  );
}
