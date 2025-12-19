'use client';

import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '@/config/supabaseClient.config';
import {
  Product,
  User,
  JoinRequest,
  NewsletterSubscriber,
  Order,
  ContactForm,
  CartOrder,
  GasPrice,
} from '@/types';

export type AdminTab =
  | 'products'
  | 'users'
  | 'orders'
  | 'cart_order'
  | 'join_requests'
  | 'newsletter_subscribers'
  | 'contact_forms'
  | 'gas_prices';

export function useAdminData(activeTab: AdminTab, enabled: boolean) {
  const [loading, setLoading] = useState(true);
  const [refreshTick, setRefreshTick] = useState(0);

  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<
    NewsletterSubscriber[]
  >([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [cartOrder, setCartOrder] = useState<CartOrder[]>([]);
  const [gasPrices, setGasPrices] = useState<GasPrice[]>([]);

  const prevOrdersCount = useRef<number | null>(null);
  const prevCartCount = useRef<number | null>(null);

  /* ─────────────────────────────────────────────
     Auto refresh (10 mins + focus + global event)
  ───────────────────────────────────────────── */
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setRefreshTick((v) => v + 1);
    }, 10 * 60 * 1000); // 10 minutes

    const onFocus = () => {
      setRefreshTick((v) => v + 1);
    };

    const onGlobalRefresh = () => {
      setRefreshTick((v) => v + 1);
    };

    window.addEventListener('focus', onFocus);
    window.addEventListener('admin:refresh', onGlobalRefresh);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('admin:refresh', onGlobalRefresh);
    };
  }, [enabled]);

  /* ─────────────────────────────────────────────
     Fetch active tab data
  ───────────────────────────────────────────── */
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const run = async () => {
      setLoading(true);

      const q = {
        products: () => supabase.from('products').select('*'),
        users: () => supabase.from('users').select('*'),
        orders: () => supabase.from('orders').select('*'),
        join_requests: () => supabase.from('join_requests').select('*'),
        newsletter_subscribers: () =>
          supabase.from('newsletter_subscribers').select('*'),
        contact_forms: () => supabase.from('contact_forms').select('*'),
        cart_order: () => supabase.from('cart_order').select('*'),
        gas_prices: () => supabase.from('gas_prices').select('*'),
      };

      const { data, error } = await q[activeTab]();

      if (cancelled) return;

      if (!error && data) {
        switch (activeTab) {
          case 'products':
            setProducts(data as Product[]);
            break;

          case 'users':
            setUsers(data as User[]);
            break;

          case 'orders': {
            const next = data as Order[];

            if (
              prevOrdersCount.current !== null &&
              next.length > prevOrdersCount.current
            ) {
              toast.success('🛒 New order received');
            }

            prevOrdersCount.current = next.length;
            setOrders(next);
            break;
          }

          case 'join_requests':
            setJoinRequests(data as JoinRequest[]);
            break;

          case 'newsletter_subscribers':
            setNewsletterSubscribers(data as NewsletterSubscriber[]);
            break;

          case 'contact_forms':
            setContactForms(data as ContactForm[]);
            break;

          case 'cart_order': {
            const next = data as CartOrder[];

            if (
              prevCartCount.current !== null &&
              next.length > prevCartCount.current
            ) {
              toast.success('🛍 New cart order received');
            }

            prevCartCount.current = next.length;
            setCartOrder(next);
            break;
          }

          case 'gas_prices':
            setGasPrices(data as GasPrice[]);
            break;
        }
      }

      setLoading(false);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [activeTab, enabled, refreshTick]);

  return {
    loading,

    products,
    setProducts,

    users,

    joinRequests,

    newsletterSubscribers,

    orders,
    setOrders,

    contactForms,

    cartOrder,
    setCartOrder,

    gasPrices,
    setGasPrices,
  };
}
