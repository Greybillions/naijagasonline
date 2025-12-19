import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabaseClient.config';

type StatusRow = {
  status: 'pending' | 'completed' | null;
};

type AdminStats = {
  products: number;
  orders: number;
  pendingOrders: number;
  completedOrders: number;
  cartOrders: number;
  pendingCart: number;
  completedCart: number;
  subscribers: number;
};

const INITIAL_STATS: AdminStats = {
  products: 0,
  orders: 0,
  pendingOrders: 0,
  completedOrders: 0,
  cartOrders: 0,
  pendingCart: 0,
  completedCart: 0,
  subscribers: 0,
};

export function useAdminStats(enabled: boolean) {
  const [stats, setStats] = useState<AdminStats>(INITIAL_STATS);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const run = async () => {
      const [productsRes, ordersRes, cartRes, subscribersRes] =
        await Promise.all([
          supabase
            .from('products')
            .select('id', { count: 'exact', head: true }),

          supabase.from('orders').select('status'),

          supabase.from('cart_order').select('status'),

          supabase
            .from('newsletter_subscribers')
            .select('id', { count: 'exact', head: true }),
        ]);

      if (cancelled) return;

      // Defensive fallbacks
      const orderStatuses = (ordersRes.data ?? []) as StatusRow[];
      const cartStatuses = (cartRes.data ?? []) as StatusRow[];

      const pendingOrders = orderStatuses.filter(
        (o) => (o.status ?? 'pending') === 'pending'
      ).length;

      const completedOrders = orderStatuses.filter(
        (o) => o.status === 'completed'
      ).length;

      const pendingCart = cartStatuses.filter(
        (o) => (o.status ?? 'pending') === 'pending'
      ).length;

      const completedCart = cartStatuses.filter(
        (o) => o.status === 'completed'
      ).length;

      setStats({
        products: productsRes.count ?? 0,
        orders: orderStatuses.length,
        pendingOrders,
        completedOrders,
        cartOrders: cartStatuses.length,
        pendingCart,
        completedCart,
        subscribers: subscribersRes.count ?? 0,
      });
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return stats;
}
