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
  CartOrder,
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
  const [cartOrder, setCartOrder] = useState<CartOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    | 'products'
    | 'users'
    | 'orders'
    | 'cart_order'
    | 'join_requests'
    | 'newsletter_subscribers'
    | 'contact_forms'
  >('products');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

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
        const { data, error } = await supabase.from('contact_form').select('*');
        if (!error && data) setContactForms(data);
      }
      if (activeTab === 'cart_order') {
        const { data, error } = await supabase.from('cart_order').select('*');
        if (!error && data) setCartOrder(data);
      }

      setLoading(false);
    };

    fetchData();
  }, [isAdmin, activeTab]);

  const confirmDelete = (id: string) => {
    setSelectedProductId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedProductId) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', selectedProductId);

    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== selectedProductId));
      setShowDeleteModal(false);
      setSelectedProductId(null);
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
      case 'cart_order':
        return cartOrder.length;
      default:
        return 0;
    }
  };

  const dataMap = {
    products,
    users,
    orders,
    cart_order: cartOrder,
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
          <option value='cart_order'>Cart Orders</option>
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
        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <Link
              href='/admin/addNewProduct'
              className='mb-6 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
            >
              Add New Product
            </Link>
            <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
              {products.length === 0 ? (
                <p>No products found.</p>
              ) : (
                products.map((product, index) => (
                  <div
                    key={product.id}
                    className='p-4 border rounded flex md:flex-col items-center justify-between'
                  >
                    <div className='flex md:flex-col items-center gap-4'>
                      <span className='font-bold text-gray-500'>
                        {index + 1}.
                      </span>
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
                        <h2 className='font-semibold text-lg'>
                          {product.title}
                        </h2>
                        <p className='text-orange-600 font-medium'>
                          ₦{product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Link
                        href={`/admin/edit/${product.id}`}
                        className='text-blue-600 hover:underline'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => confirmDelete(product.id)}
                        className='text-red-500 hover:underline'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order, index) => (
                <div
                  key={order.id}
                  className='p-4 border rounded flex justify-between items-center'
                >
                  <div>
                    <span className='font-bold text-gray-500'>
                      {index + 1}.
                    </span>
                    <p className='font-semibold text-lg'>{order.full_name}</p>

                    <p className='text-sm'>Kg: {order.kg}</p>
                    <p className='text-sm'>
                      Total: ₦{order.price.toLocaleString()}
                    </p>
                    <p className='text-sm'>📞 {order.phone}</p>
                    <p className='text-sm'>State: {order.state}</p>
                    <p className='text-sm'>City: {order.city}</p>
                    <p className='text-sm'>
                      Order Date:{' '}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p className='text-sm'>Address: {order.address || 'N/A'}</p>
                    <p className='text-sm'>
                      Delivery Option: {order.delivery_option}
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

        {/* Cart Orders */}
        {activeTab === 'cart_order' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {cartOrder.length === 0 ? (
              <p>No cart orders found.</p>
            ) : (
              cartOrder.map((order, index) => (
                <div
                  key={order.tx_ref}
                  className='p-4 border rounded flex flex-col gap-2'
                >
                  <span className='font-bold text-gray-500'>{index + 1}.</span>
                  <p className='font-semibold text-lg'>Name: {order.name}</p>
                  <p className='text-sm'>📞 {order.phonenumber}</p>
                  <p className='text-sm'>Address: {order.address}</p>
                  <p className='text-sm'>Delivery: {order.delivery_method}</p>
                  <p className='text-sm'>TX Ref: {order.tx_ref}</p>
                  <p className='text-sm font-semibold'>
                    Total: ₦
                    {order.product
                      ?.reduce((sum, item) => {
                        const total =
                          typeof item.total === 'number' ? item.total : 0;
                        return sum + total;
                      }, 0)
                      .toLocaleString()}
                  </p>
                  <div className='mt-2'>
                    <p className='font-medium'>Products:</p>
                    <ul className='list-disc list-inside text-sm text-gray-600'>
                      {order.product.map((item, i) => (
                        <li key={i}>
                          {item.name} - {item.kg}kg x {item.quantity} = ₦
                          {(typeof item.total === 'number'
                            ? item.total
                            : 0
                          ).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              users.map((user, index) => (
                <div
                  key={user.id}
                  className='p-4 border rounded flex justify-between items-center'
                >
                  <div>
                    <span className='font-bold text-gray-500'>
                      {index + 1}.
                    </span>
                    <p className='font-semibold text-lg'>{user.seller_name}</p>
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

        {/* Join Requests */}
        {activeTab === 'join_requests' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {joinRequests.length === 0 ? (
              <p>No join requests.</p>
            ) : (
              joinRequests.map((req, index) => (
                <div key={req.id} className='p-4 border rounded'>
                  <span className='font-bold text-gray-500'>{index + 1}.</span>
                  <p className='font-semibold text-lg'>{req.full_name}</p>
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

        {/* Newsletter Subscribers */}
        {activeTab === 'newsletter_subscribers' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {newsletterSubscribers.length === 0 ? (
              <p>No subscribers yet.</p>
            ) : (
              newsletterSubscribers.map((sub, index) => (
                <div key={sub.id} className='p-4 border rounded'>
                  <span className='font-bold text-gray-500'>{index + 1}.</span>
                  <p className='text-sm'>{sub.email}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Contact Form Submissions */}
        {activeTab === 'contact_forms' && (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {contactForms.length === 0 ? (
              <p>No contact form submissions yet.</p>
            ) : (
              contactForms.map((item, index) => (
                <div key={item.id} className='p-4 border rounded'>
                  <span className='font-bold text-gray-500'>{index + 1}.</span>
                  <p className='font-semibold text-lg'>{item.full_name}</p>
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
      {showDeleteModal && (
        <div className='fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm text-center'>
            <h2 className='text-lg font-semibold mb-4'>Confirm Deletion</h2>
            <p className='text-sm text-gray-600 mb-6'>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm font-medium'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
