'use client';

import React from 'react';

import AdminHeader from '@/components/AdminHeader';
import ProductsGrid from '@/components/admin/ProductsGrid';
import OrdersGrid from '@/components/admin/OrdersGrid';
import CartOrdersGrid from '@/components/admin/CartOrdersGrid';
import UsersGrid from '@/components/admin/UsersGrid';
import JoinRequestsGrid from '@/components/admin/JoinRequestsGrid';
import NewsletterGrid from '@/components/admin/NewsletterGrid';
import ContactFormsGrid from '@/components/admin/ContactFormsGrid';

import { useAdminGate } from '@/hooks/useAdminGate';
import { useAdminData, type AdminTab } from '@/hooks/useAdminData';

import type {
  Product,
  User,
  JoinRequest,
  NewsletterSubscriber,
  Order,
  ContactForm,
  CartOrder,
} from '@/types';

// ---------- small UI atoms ----------
function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className='rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow'>
      <div className='text-xs uppercase tracking-wide text-gray-500'>
        {label}
      </div>
      <div className='mt-1 text-2xl font-semibold text-gray-900'>{value}</div>
      {hint && <div className='mt-1 text-xs text-gray-500'>{hint}</div>}
    </div>
  );
}

function SidebarItem({
  active,
  onClick,
  children,
  count,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition',
        active
          ? 'bg-orange-50 text-orange-700 ring-1 ring-orange-200'
          : 'text-gray-700 hover:bg-gray-50',
      ].join(' ')}
    >
      <span className='inline-flex items-center gap-2'>
        <span
          className={[
            'inline-flex h-6 w-6 items-center justify-center rounded-lg text-base',
            active
              ? 'bg-orange-100 text-orange-700'
              : 'bg-gray-100 text-gray-600',
          ].join(' ')}
        >
          {/* icon slot: provided by child (emoji) */}
        </span>
        <span className='group-hover:translate-x-0.5 transition'>
          {children}
        </span>
      </span>
      {typeof count === 'number' && (
        <span
          className={[
            'ml-2 rounded-full px-2 py-0.5 text-xs',
            active
              ? 'bg-orange-100 text-orange-700'
              : 'bg-gray-100 text-gray-600',
          ].join(' ')}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// --------------------------------------------------------

export default function AdminPage() {
  const { ready, isAdmin } = useAdminGate();
  const [activeTab, setActiveTab] = React.useState<AdminTab>('products');

  const {
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
  } = useAdminData(activeTab, ready && isAdmin);

  // global search + per-tab status filter
  const [query, setQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<
    'all' | 'pending' | 'completed'
  >('all');

  // keyboard shortcuts: "/" focus search, "r" refresh, "e" export
  const searchRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if ((e.key === 'r' || e.key === 'R') && (e.ctrlKey || e.metaKey)) {
        // let browser refresh do its thing
        return;
      }
      if (e.key === 'e' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleExport();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // counts
  const totals: Record<AdminTab, number> = {
    products: products.length,
    users: users.length,
    orders: orders.length,
    cart_order: cartOrder.length,
    join_requests: joinRequests.length,
    newsletter_subscribers: newsletterSubscribers.length,
    contact_forms: contactForms.length,
  } as const;

  // derived filtered data
  const q = query.trim().toLowerCase();

  const filtered = React.useMemo(() => {
    switch (activeTab) {
      case 'products':
        return products.filter((p) => {
          const hay = `${p.title ?? ''} ${p.subtitle ?? ''} ${
            p.description ?? ''
          } ${p.seller_name ?? ''}`.toLowerCase();
          return hay.includes(q);
        });
      case 'orders':
        return orders.filter((o) => {
          const hay = `${o.full_name ?? ''} ${o.phone ?? ''} ${o.city ?? ''} ${
            o.state ?? ''
          } ${o.address ?? ''}`.toLowerCase();
          const matchQ = hay.includes(q);
          const matchS =
            statusFilter === 'all'
              ? true
              : (o.status ?? 'pending') === statusFilter;
          return matchQ && matchS;
        });
      case 'cart_order':
        return cartOrder.filter((o) => {
          const hay = `${o.name ?? ''} ${o.phonenumber ?? ''} ${
            o.address ?? ''
          } ${o.delivery_method ?? ''}`.toLowerCase();
          const matchQ = hay.includes(q);
          const matchS =
            statusFilter === 'all'
              ? true
              : (o.status ?? 'pending') === statusFilter;
          return matchQ && matchS;
        });
      case 'users':
        return users.filter((u) => {
          const hay = `${u.full_name ?? ''} ${u.phone ?? ''} ${u.city ?? ''} ${
            u.state ?? ''
          }`.toLowerCase();
          return hay.includes(q);
        });
      case 'join_requests':
        return joinRequests.filter((r) => {
          const hay = `${r.full_name ?? ''} ${r.phone ?? ''} ${r.city ?? ''} ${
            r.state ?? ''
          } ${r.role ?? ''} ${r.message ?? ''}`.toLowerCase();
          return hay.includes(q);
        });
      case 'newsletter_subscribers':
        return newsletterSubscribers.filter((n) =>
          (n.email ?? '').toLowerCase().includes(q)
        );
      case 'contact_forms':
        return contactForms.filter((c) => {
          const hay = `${c.full_name ?? ''} ${c.city ?? ''} ${c.state ?? ''} ${
            c.message ?? ''
          } ${c.gas_info ?? ''}`.toLowerCase();
          return hay.includes(q);
        });
      default:
        return [];
    }
  }, [
    activeTab,
    q,
    statusFilter,
    products,
    orders,
    cartOrder,
    users,
    joinRequests,
    newsletterSubscribers,
    contactForms,
  ]);

  // quick export (reuses your utils/export under Toolbar in your codebase)
  const handleExport = () => {
    // lazy import to avoid bundling here
    import('@/utils/export').then(({ exportToCSV }) => {
      exportToCSV(filtered as unknown as Record<string, unknown>[], activeTab);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    location.href = '/admin/login';
  };

  if (!ready || !isAdmin || loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='flex flex-col items-center gap-4'>
          <div className='h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin' />
          <p className='text-sm text-gray-600'>Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  // order stats (for cards)
  const pendingOrders = orders.filter(
    (o) => (o.status ?? 'pending') === 'pending'
  ).length;
  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const pendingCart = cartOrder.filter(
    (o) => (o.status ?? 'pending') === 'pending'
  ).length;
  const completedCart = cartOrder.filter(
    (o) => o.status === 'completed'
  ).length;

  return (
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6'>
      <AdminHeader handleLogout={handleLogout} />

      {/* Top: Stats overview */}
      <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
        <StatCard label='Products' value={products.length} />
        <StatCard
          label='Orders'
          value={orders.length}
          hint={`${pendingOrders} pending • ${completedOrders} done`}
        />
        <StatCard
          label='Cart Orders'
          value={cartOrder.length}
          hint={`${pendingCart} pending • ${completedCart} done`}
        />
        <StatCard label='Subscribers' value={newsletterSubscribers.length} />
      </div>

      <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[15rem_1fr]'>
        {/* Sidebar */}
        <aside className='rounded-2xl border border-gray-100 bg-white p-3 shadow-sm lg:sticky lg:top-4 lg:h-[calc(100vh-8rem)] lg:overflow-auto'>
          <div className='mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500'>
            Sections
          </div>
          <div className='space-y-1'>
            <SidebarItem
              active={activeTab === 'products'}
              onClick={() => setActiveTab('products')}
              count={products.length}
            >
              🛍 Products
            </SidebarItem>
            <SidebarItem
              active={activeTab === 'orders'}
              onClick={() => setActiveTab('orders')}
              count={orders.length}
            >
              📦 Orders
            </SidebarItem>
            <SidebarItem
              active={activeTab === 'cart_order'}
              onClick={() => setActiveTab('cart_order')}
              count={cartOrder.length}
            >
              🛒 Cart Orders
            </SidebarItem>
            <SidebarItem
              active={activeTab === 'users'}
              onClick={() => setActiveTab('users')}
              count={users.length}
            >
              👥 Users
            </SidebarItem>
            <SidebarItem
              active={activeTab === 'join_requests'}
              onClick={() => setActiveTab('join_requests')}
              count={joinRequests.length}
            >
              🤝 Join Requests
            </SidebarItem>
            <SidebarItem
              active={activeTab === 'newsletter_subscribers'}
              onClick={() => setActiveTab('newsletter_subscribers')}
              count={newsletterSubscribers.length}
            >
              📧 Subscribers
            </SidebarItem>
            <SidebarItem
              active={activeTab === 'contact_forms'}
              onClick={() => setActiveTab('contact_forms')}
              count={contactForms.length}
            >
              💬 Contact Forms
            </SidebarItem>
          </div>

          <div className='mt-6 space-y-2'>
            <button
              onClick={handleExport}
              className='w-full rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700'
            >
              ⬇ Export filtered
            </button>
            <button
              onClick={() => location.reload()}
              className='w-full rounded-xl bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 shadow hover:bg-gray-200'
            >
              ↻ Refresh
            </button>
          </div>

          <div className='mt-6 rounded-xl bg-orange-50 p-3 text-xs text-orange-800'>
            Tip: <kbd className='rounded bg-white px-1'>/</kbd> to search,{' '}
            <kbd className='rounded bg-white px-1'>⌘/Ctrl</kbd>+
            <kbd className='rounded bg-white px-1'>E</kbd> to export
          </div>
        </aside>

        {/* Main area */}
        <main className='space-y-4'>
          {/* Controls */}
          <div className='rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex flex-1 items-center gap-3'>
                <div className='relative w-full sm:max-w-md'>
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search by name, phone, city…'
                    className='w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-100'
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
                    className='rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-100'
                  >
                    <option value='all'>All statuses</option>
                    <option value='pending'>Pending</option>
                    <option value='completed'>Completed</option>
                  </select>
                )}
              </div>

              <div className='text-sm text-gray-600'>
                Showing{' '}
                <span className='font-medium text-gray-900'>
                  {filtered.length}
                </span>{' '}
                of{' '}
                <span className='font-medium text-gray-900'>
                  {totals[activeTab]}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
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
                    o.id === id ? { ...o, status: 'completed' as const } : o
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
                    o.tx_ref === tx ? { ...o, status: 'completed' as const } : o
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
        </main>
      </div>
    </div>
  );
}
