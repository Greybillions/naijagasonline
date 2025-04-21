'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabaseClient.config';
import Image from 'next/image';
import Link from 'next/link';

import {
  Product,
  User,
  JoinRequest,
  NewsletterSubscriber,
  Order,
  ContactForm,
} from '@/types';

import { exportToCSV } from '@/utils/export';

const AdminPage = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<
    NewsletterSubscriber[]
  >([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    | 'products'
    | 'users'
    | 'orders'
    | 'join_requests'
    | 'newsletter_subscribers'
    | 'contact_forms'
  >('products');

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin) {
      setIsAdmin(true);
    } else {
      router.replace('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;

      if (activeTab === 'products') {
        const { data, error } = await supabase.from('products').select('*');
        if (!error && data) setProducts(data);
      }

      if (activeTab === 'users') {
        const { data, error } = await supabase
          .from('join_requests')
          .select('*');
        if (!error && data) setUsers(data);
      }

      if (activeTab === 'orders') {
        const { data, error } = await supabase.from('orders').select('*');
        if (!error && data) setOrders(data);
      }

      if (activeTab === 'join_requests') {
        const { data, error } = await supabase
          .from('join_requests')
          .select('*');
        if (!error && data) setJoinRequests(data);
      }

      if (activeTab === 'newsletter_subscribers') {
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .select('*');
        if (!error && data) setNewsletterSubscribers(data);
      }

      if (activeTab === 'contact_forms') {
        const { data, error } = await supabase
          .from('contact_form')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setContactForms(data);
      }

      setLoading(false);
    };

    fetchData();
  }, [isAdmin, activeTab]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('Failed to delete product.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.replace('/admin/login');
  };

  if (!isAdmin || loading) return <div className='p-6'>Loading...</div>;

  const getTotal = () => {
    switch (activeTab) {
      case 'products':
        return products.length;
      case 'users':
        return users.length;
      case 'orders':
        return orders.length;
      case 'join_requests':
        return joinRequests.length;
      case 'contact_forms':
        return contactForms.length;
      case 'newsletter_subscribers':
        return newsletterSubscribers.length;
      default:
        return 0;
    }
  };

  const dataMap = {
    products,
    users,
    orders,
    join_requests: joinRequests,
    newsletter_subscribers: newsletterSubscribers,
    contact_forms: contactForms,
  };

  return (
    <div className='max-w-6xl mx-auto px-6 py-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl md:text-3xl font-bold'>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm'
        >
          Logout
        </button>
      </div>

      <div className='mb-8 flex flex-wrap items-center gap-4'>
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as typeof activeTab)}
          className='px-4 py-2 border rounded-md'
        >
          <option value='products'>Products</option>
          <option value='users'>Users</option>
          <option value='orders'>Orders</option>
          <option value='join_requests'>Join Requests</option>
          <option value='newsletter_subscribers'>Newsletter Subscribers</option>
          <option value='contact_forms'>Contact Form Submissions</option>
        </select>

        <span className='text-sm text-gray-600'>Total: {getTotal()}</span>

        <button
          onClick={() => {
            const data = dataMap[activeTab] as Record<string, unknown>[];
            exportToCSV(data, activeTab);
          }}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm'
        >
          Download CSV
        </button>
      </div>

      <div>
        {activeTab === 'products' && (
          <div>
            <Link
              href='/admin/addNewProduct'
              className='mb-6 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
            >
              Add New Product
            </Link>
            <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
              {products.length === 0 && <p>No products found.</p>}
              {products.map((product) => (
                <div
                  key={product.id}
                  className='p-4 border rounded flex md:flex-col items-center justify-between'
                >
                  <div className='flex md:flex-col items-center gap-4'>
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={80}
                        height={80}
                        className='rounded object-cover'
                      />
                    )}
                    <div>
                      <h2 className='font-semibold text-lg'>{product.title}</h2>
                      <p className='text-orange-600 font-medium'>
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-3'>
                    <Link
                      href={`/admin/edit/${product.id}`}
                      className='text-blue-600 hover:underline'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className='text-red-500 hover:underline'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* orders */}
        {activeTab === 'orders' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className='p-4 border rounded flex justify-between items-center'
                >
                  <div>
                    <p className='font-semibold text-lg'>{order.full_name}</p>
                    <p className='text-sm text-gray-700'>
                      email: {order.email}
                    </p>
                    <p className='text-sm'>Kg: {order.kg}</p>
                    <p className='text-sm'>
                      Total: ₦{order.price.toLocaleString()}
                    </p>
                    <p className='text-sm'>📞 {order.phone}</p>
                    <p className='text-sm'>
                      {order.city}, {order.state}
                    </p>
                    <p className='text-sm'>
                      Order Date:
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p className='text-sm'>Address: {order.home_address}</p>
                    <p className='text-sm'>
                      Delivery Option: {order.delivery_option}{' '}
                    </p>
                  </div>
                  <div className='text-right'>
                    <span className='text-xs bg-green-100 text-shadow-green-600 px-2 py-1 rounded'>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* users */}
        {activeTab === 'users' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className='p-4 border rounded flex justify-between items-center'
                >
                  <div>
                    <p className='font-semibold text-lg'>{user.seller_name}</p>
                    <p className='text-sm text-gray-700'>{user.email}</p>
                    <p className='text-sm'>📞 {user.phone}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm text-gray-600'>
                      {user.city}, {user.state}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {/* join requests */}
        {activeTab === 'join_requests' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {joinRequests.length === 0 ? (
              <p>No join requests.</p>
            ) : (
              joinRequests.map((req) => (
                <div key={req.id} className='p-4 border rounded'>
                  <p className='font-semibold text-lg'>{req.full_name}</p>
                  <p className='text-sm text-gray-700'>{req.email}</p>
                  <p className='text-sm'>📞 {req.phone}</p>
                  <p className='text-sm'>Role: {req.role}</p>
                  <p className='text-sm'>
                    Address: {req.state}, {req.city}
                  </p>
                  <p className='text-sm'>Message: {req.message}</p>
                </div>
              ))
            )}
          </div>
        )}
        {/* newsletter subscribers */}
        {activeTab === 'newsletter_subscribers' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {newsletterSubscribers.length === 0 ? (
              <p>No subscribers yet.</p>
            ) : (
              newsletterSubscribers.map((sub) => (
                <div key={sub.id} className='p-4 border rounded'>
                  <p className='text-sm'>{sub.email}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* contact form submissions */}
        {activeTab === 'contact_forms' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {contactForms.length === 0 ? (
              <p>No contact form submissions yet.</p>
            ) : (
              contactForms.map((item) => (
                <div key={item.id} className='p-4 border rounded'>
                  <p className='font-semibold text-lg'>{item.full_name}</p>
                  <p className='text-sm text-gray-700'>Email: {item.email}</p>
                  <p className='text-sm'>
                    State: {item.state}, City: {item.city}
                  </p>
                  <p className='text-sm'>Message: {item.message}</p>
                  {item.gas_info && (
                    <p className='text-sm'>Gas Info: {item.gas_info}</p>
                  )}
                  {item.image_url && (
                    <a
                      href={item.image_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 text-sm underline mt-2 inline-block'
                    >
                      View Image
                    </a>
                  )}
                  <p className='text-xs text-gray-500 mt-2'>
                    Submitted: {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
