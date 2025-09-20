'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabaseClient.config';
import { Product, User, JoinRequest, NewsletterSubscriber, Order, ContactForm, CartOrder } from '@/types';

export type AdminTab =
  | 'products'
  | 'users'
  | 'orders'
  | 'cart_order'
  | 'join_requests'
  | 'newsletter_subscribers'
  | 'contact_forms';

export function useAdminData(activeTab: AdminTab, enabled: boolean) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [cartOrder, setCartOrder] = useState<CartOrder[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!enabled) return;
      setLoading(true);

      const q = {
        products: () => supabase.from('products').select('*'),
        users: () => supabase.from('join_requests').select('*'), // your original mapping
        orders: () => supabase.from('orders').select('*'),
        join_requests: () => supabase.from('join_requests').select('*'),
        newsletter_subscribers: () => supabase.from('newsletter_subscribers').select('*'),
        contact_forms: () => supabase.from('contact_form').select('*'),
        cart_order: () => supabase.from('cart_order').select('*'),
      }[activeTab];

      const { data, error } = await q();
      if (cancelled) return;

      if (!error && data) {
        switch (activeTab) {
          case 'products': setProducts(data as Product[]); break;
          case 'users': setUsers(data as unknown as User[]); break;
          case 'orders': setOrders(data as Order[]); break;
          case 'join_requests': setJoinRequests(data as JoinRequest[]); break;
          case 'newsletter_subscribers': setNewsletterSubscribers(data as NewsletterSubscriber[]); break;
          case 'contact_forms': setContactForms(data as ContactForm[]); break;
          case 'cart_order': setCartOrder(data as CartOrder[]); break;
        }
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [activeTab, enabled]);

  return {
    loading,
    products, setProducts,
    users,
    joinRequests,
    newsletterSubscribers,
    orders, setOrders,
    contactForms,
    cartOrder, setCartOrder,
  };
}
