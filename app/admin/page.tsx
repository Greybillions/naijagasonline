'use client';

import React from 'react';

import AdminHeader from '@/components/AdminHeader';
import AdminStats from '@/components/admin/AdminStats';
import Tabs from '@/components/admin/Tabs';
import Toolbar from '@/components/admin/Toolbar';

import ProductsGrid from '@/components/admin/ProductsGrid';
import OrdersGrid from '@/components/admin/OrdersGrid';
import CartOrdersGrid from '@/components/admin/CartOrdersGrid';
import UsersGrid from '@/components/admin/UsersGrid';
import JoinRequestsGrid from '@/components/admin/JoinRequestsGrid';
import NewsletterGrid from '@/components/admin/NewsletterGrid';
import ContactFormsGrid from '@/components/admin/ContactFormsGrid';
import GasPricesGrid from '@/components/admin/GasPricesGrid';

import { useAdminGate } from '@/hooks/useAdminGate';
import { useAdminData, AdminTab } from '@/hooks/useAdminData';
import { useAdminFilter } from '@/hooks/admin/useAdminFilter';
import { useAdminKeyboard } from '@/hooks/admin/useAdminKeyboard';
import { useAdminStats } from '@/hooks/admin/useAdminStats';

import {
  Product,
  Order,
  CartOrder,
  User,
  JoinRequest,
  NewsletterSubscriber,
  ContactForm,
  GasPrice,
} from '@/types';

export default function AdminPage() {
  // ─────────────────────────────────────────────
  // Access control
  // ─────────────────────────────────────────────
  const { ready, isAdmin } = useAdminGate();

  // ─────────────────────────────────────────────
  // Stats
  // ─────────────────────────────────────────────
  const stats = useAdminStats(ready && isAdmin);

  // ─────────────────────────────────────────────
  // UI state
  // ─────────────────────────────────────────────
  const [activeTab, setActiveTab] = React.useState<AdminTab>('products');
  const [query, setQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<
    'all' | 'pending' | 'completed'
  >('all');

  const searchRef = React.useRef<HTMLInputElement | null>(null);

  // ─────────────────────────────────────────────
  // Data
  // ─────────────────────────────────────────────
  const {
    loading,
    products,
    setProducts,
    orders,
    setOrders,
    cartOrder,
    setCartOrder,
    users,
    joinRequests,
    newsletterSubscribers,
    contactForms,
    gasPrices,
    setGasPrices,
  } = useAdminData(activeTab, ready && isAdmin);

  // ─────────────────────────────────────────────
  // Totals
  // ─────────────────────────────────────────────
  const totals: Record<AdminTab, number> = {
    products: products.length,
    users: users.length,
    orders: orders.length,
    cart_order: cartOrder.length,
    join_requests: joinRequests.length,
    newsletter_subscribers: newsletterSubscribers.length,
    contact_forms: contactForms.length,
    gas_prices: gasPrices.length,
  };

  // ─────────────────────────────────────────────
  // Filtering
  // ─────────────────────────────────────────────
  const filtered = useAdminFilter({
    activeTab,
    query,
    statusFilter,
    products,
    orders,
    cartOrder,
    users,
    joinRequests,
    newsletterSubscribers,
    contactForms,
    gasPrices, // ✅ NEW
  });

  // ─────────────────────────────────────────────
  // Export
  // ─────────────────────────────────────────────
  const handleExport = React.useCallback(() => {
    import('@/utils/export').then(({ exportToCSV }) => {
      exportToCSV(filtered as Record<string, unknown>[], activeTab);
    });
  }, [filtered, activeTab]);

  // ─────────────────────────────────────────────
  // Logout
  // ─────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/admin/login';
  };

  // ─────────────────────────────────────────────
  // Keyboard shortcuts
  // ─────────────────────────────────────────────
  useAdminKeyboard({
    onExport: handleExport,
    searchRef,
  });

  // ─────────────────────────────────────────────
  // Loading gate
  // ─────────────────────────────────────────────
  if (!ready || !isAdmin || loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='flex flex-col items-center gap-4'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent' />
          <p className='text-sm text-gray-600'>Loading Admin Portal…</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6'>
      <AdminHeader handleLogout={handleLogout} />

      <AdminStats stats={stats} />

      <div className='mt-6 space-y-4'>
        <Tabs value={activeTab} onChange={setActiveTab} />

        {/* Search + Filters */}
        <div className='rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='relative w-full sm:max-w-md'>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search by name, phone, city…'
                className='w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm'
              />
              <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400'>
                ⌘/
              </span>
            </div>

            {(activeTab === 'orders' || activeTab === 'cart_order') && (
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as 'all' | 'pending' | 'completed'
                  )
                }
                className='rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm'
              >
                <option value='all'>All statuses</option>
                <option value='pending'>Pending</option>
                <option value='completed'>Completed</option>
              </select>
            )}
          </div>

          <div className='mt-3 text-sm text-gray-600'>
            Showing{' '}
            <span className='font-medium text-gray-900'>{filtered.length}</span>{' '}
            result{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>

        <Toolbar
          activeTab={activeTab}
          total={totals[activeTab]}
          data={filtered as Record<string, unknown>[]}
        />

        {activeTab === 'products' && (
          <ProductsGrid
            items={filtered as Product[]}
            onDeleted={(id) =>
              setProducts((prev) => prev.filter((p) => p.id !== id))
            }
          />
        )}

        {activeTab === 'orders' && (
          <OrdersGrid
            items={filtered as Order[]}
            onStatus={(id) =>
              setOrders((prev) =>
                prev.map((o) =>
                  o.id === id ? { ...o, status: 'completed' } : o
                )
              )
            }
          />
        )}

        {activeTab === 'cart_order' && (
          <CartOrdersGrid
            items={filtered as CartOrder[]}
            onStatus={(tx) =>
              setCartOrder((prev) =>
                prev.map((o) =>
                  o.tx_ref === tx ? { ...o, status: 'completed' } : o
                )
              )
            }
          />
        )}

        {activeTab === 'gas_prices' && (
          <GasPricesGrid
            items={filtered as GasPrice[]}
            onAdd={(row) => setGasPrices((prev) => [...prev, row])}
            onDelete={(id) =>
              setGasPrices((prev) => prev.filter((g) => g.id !== id))
            }
            onUpdate={(id, next) =>
              setGasPrices((prev) =>
                prev.map((g) =>
                  g.id === id ? { ...g, kg: next.kg, amount: next.amount } : g
                )
              )
            }
          />
        )}

        {activeTab === 'users' && <UsersGrid items={filtered as User[]} />}

        {activeTab === 'join_requests' && (
          <JoinRequestsGrid items={filtered as JoinRequest[]} />
        )}

        {activeTab === 'newsletter_subscribers' && (
          <NewsletterGrid items={filtered as NewsletterSubscriber[]} />
        )}

        {activeTab === 'contact_forms' && (
          <ContactFormsGrid items={filtered as ContactForm[]} />
        )}
      </div>
    </div>
  );
}
