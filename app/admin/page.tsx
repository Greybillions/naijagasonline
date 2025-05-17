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
import AdminHeader from '@/components/AdminHeader';

const AdminPage = () => {
  const router = useRouter();

  const [confirmingOrderId, setConfirmingOrderId] = useState<string | null>(
    null
  );

  const [confirmingTx, setConfirmingTx] = useState<string | null>(null);

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

  if (!isAdmin || loading)
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='flex flex-col items-center gap-4'>
          <div className='h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin'></div>
          <p className='text-sm text-gray-600'>Loading Admin Portal...</p>
        </div>
      </div>
    );

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
      <AdminHeader handleLogout={handleLogout} />

      <div className='mb-8 flex flex-wrap items-center gap-4 p-4 bg-white shadow rounded-lg transition-all duration-300 ease-in-out'>
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as typeof activeTab)}
          className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200'
        >
          <option value='products'>🛍 Products</option>
          <option value='users'>👥 Users</option>
          <option value='orders'>📦 Orders</option>
          <option value='cart_order'>🛒 Cart Orders</option>
          <option value='join_requests'>🤝 Join Requests</option>
          <option value='newsletter_subscribers'>
            📧 Newsletter Subscribers
          </option>
          <option value='contact_forms'>💬 Contact Submissions</option>
        </select>

        <span className='text-sm text-gray-700 font-medium'>
          Total:{' '}
          <span className='font-semibold text-gray-900'>{getTotal()}</span>
        </span>

        <button
          onClick={() => {
            const data = dataMap[activeTab] as Record<string, unknown>[];
            exportToCSV(data, activeTab);
          }}
          className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium shadow-md transition duration-200'
        >
          ⬇ Download CSV
        </button>
      </div>

      <div>
        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <Link
              href='/admin/addNewProduct'
              className='mb-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow transition'
            >
              ➕ Add New Product
            </Link>

            <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
              {products.length === 0 ? (
                <p className='text-gray-500'>No products found.</p>
              ) : (
                products.map((product, index) => (
                  <div
                    key={product.id}
                    className='bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 transition hover:shadow-lg'
                  >
                    <div className='flex items-center gap-4'>
                      <span className='font-semibold text-black text-sm'>
                        {index + 1}
                      </span>
                      {product.image && (
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={80}
                          height={80}
                          className='rounded-md object-cover border border-gray-200'
                        />
                      )}
                      <div>
                        <h2 className='font-semibold text-lg text-gray-800'>
                          {product.title}
                        </h2>
                        <p className='text-orange-600 font-medium text-sm'>
                          ₦{product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className='flex justify-between items-center mt-2'>
                      <Link
                        href={`/admin/edit/${product.id}`}
                        className='text-blue-600 hover:text-blue-800 text-sm font-medium transition'
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => confirmDelete(product.id)}
                        className='text-red-500 hover:text-red-700 text-sm font-medium transition'
                      >
                        🗑 Delete
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
          <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
            {orders.length === 0 ? (
              <p className='text-gray-500'>No orders found.</p>
            ) : (
              orders.map((order, index) => (
                <div
                  key={order.id}
                  className='bg-white rounded-lg shadow p-5 flex flex-col justify-between hover:shadow-md transition'
                >
                  <div className='space-y-1'>
                    <div className='flex items-center justify-between'>
                      <span className='text-black font-medium text-sm'>
                        {index + 1}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : order.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {order.status || 'Pending'}
                      </span>
                    </div>

                    <h2 className='text-lg font-semibold text-gray-800'>
                      {order.full_name}
                    </h2>

                    <p className='text-sm text-gray-600'>📞 {order.phone}</p>
                    <p className='text-sm text-gray-600'>Kg: {order.kg}</p>
                    <p className='text-sm text-gray-600'>
                      Total: ₦{order.price.toLocaleString()}
                    </p>

                    <div className='text-sm text-gray-600'>
                      <p>
                        📍 {order.city}, {order.state}
                      </p>
                      <p>📬 {order.address || 'N/A'}</p>
                    </div>

                    <p className='text-sm text-gray-600'>
                      🗓️ {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p className='text-sm text-gray-600'>
                      🚚 {order.delivery_option}
                    </p>
                  </div>
                  {order.status !== 'completed' && (
                    <button
                      onClick={() => setConfirmingOrderId(order.id)}
                      className='mt-4 bg-green-500 hover:bg-green-700 text-white text-sm px-4 py-2 rounded transition self-start'
                    >
                      ✅ Mark as Completed
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Cart Orders */}
        {activeTab === 'cart_order' && (
          <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
            {cartOrder.length === 0 ? (
              <p className='text-gray-500'>No cart orders found.</p>
            ) : (
              cartOrder.map((order, index) => (
                <div
                  key={order.tx_ref}
                  className='bg-white shadow rounded-lg p-5 hover:shadow-md transition flex flex-col gap-3'
                >
                  <div className='flex items-center justify-between text-sm text-gray-500'>
                    <span className='font-medium'>#{index + 1}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.status || 'pending'}
                    </span>
                  </div>

                  <div className='text-sm text-gray-700 space-y-1'>
                    <p>
                      <span className='font-semibold text-gray-800'>Name:</span>{' '}
                      {order.name}
                    </p>
                    <p>
                      <span className='font-semibold'>Phone:</span>{' '}
                      {order.phonenumber}
                    </p>
                    <p>
                      <span className='font-semibold'>Address:</span>{' '}
                      {order.address || 'N/A'}
                    </p>
                    <p>
                      <span className='font-semibold'>Delivery:</span>{' '}
                      {order.delivery_method}
                    </p>
                  </div>

                  <div className='text-sm font-medium text-gray-800'>
                    Total:{' '}
                    <span className='text-green-600'>
                      ₦
                      {order.product
                        ?.reduce((sum, item) => {
                          const total =
                            typeof item.total === 'number' ? item.total : 0;
                          return sum + total;
                        }, 0)
                        .toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <p className='font-semibold text-sm text-gray-800 mb-1'>
                      Products:
                    </p>
                    <ul className='list-disc list-inside text-sm text-gray-600 space-y-1'>
                      {order.product.map((item, i) => (
                        <li key={i}>
                          {item.name} – {item.kg}kg × {item.quantity} = ₦
                          {(typeof item.total === 'number'
                            ? item.total
                            : 0
                          ).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ✅ Mark as Completed Button */}
                  {order.status !== 'completed' && (
                    <button
                      onClick={() => setConfirmingTx(order.tx_ref)}
                      className='mt-3 self-start bg-green-500 hover:bg-green-700 text-white text-sm px-4 py-2 rounded transition'
                    >
                      ✅ Mark as Completed
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
            {users.length === 0 ? (
              <p className='text-gray-500'>No users found.</p>
            ) : (
              users.map((user, index) => (
                <div
                  key={user.id}
                  className='bg-white shadow rounded-lg p-5 flex justify-between items-start hover:shadow-md transition'
                >
                  <div>
                    <p className='text-lg font-semibold text-gray-800 mb-1'>
                      <span className='text-black font-medium mr-2'>
                        {index + 1}.
                      </span>
                      {user.full_name}
                    </p>
                    <p className='text-sm text-gray-600'>📞 {user.phone}</p>
                  </div>

                  <div className='text-sm text-right text-gray-600'>
                    <p>{user.city}</p>
                    <p>{user.state}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Join Requests */}
        {activeTab === 'join_requests' && (
          <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
            {joinRequests.length === 0 ? (
              <p className='text-gray-500'>No join requests.</p>
            ) : (
              joinRequests.map((req, index) => (
                <div
                  key={req.id}
                  className='bg-white rounded-lg shadow p-5 hover:shadow-md transition flex flex-col gap-2'
                >
                  <div className='flex justify-between items-center text-sm text-black'>
                    <span className='font-medium'>{index + 1}</span>
                    <span className='bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded'>
                      {req.role}
                    </span>
                  </div>

                  <h2 className='text-lg font-semibold text-gray-800'>
                    {req.full_name}
                  </h2>

                  <p className='text-sm text-gray-700'>📞 {req.phone}</p>

                  <p className='text-sm text-gray-600'>
                    📍 {req.city}, {req.state}
                  </p>

                  {req.message && (
                    <div className='mt-2 text-sm text-gray-600'>
                      <p className='font-medium'>Message:</p>
                      <p className='whitespace-pre-line'>{req.message}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Newsletter Subscribers */}
        {activeTab === 'newsletter_subscribers' && (
          <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
            {newsletterSubscribers.length === 0 ? (
              <p className='text-gray-500'>No subscribers yet.</p>
            ) : (
              newsletterSubscribers.map((sub, index) => (
                <div
                  key={sub.id}
                  className='bg-white rounded-lg shadow p-5 hover:shadow-md transition flex items-center justify-between'
                >
                  <div className='flex flex-col'>
                    <span className='text-sm text-black font-medium'>
                      {index + 1}
                    </span>
                    <p className='text-sm text-gray-700 font-medium break-words'>
                      {sub.email}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Contact Form Submissions */}
        {activeTab === 'contact_forms' && (
          <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
            {contactForms.length === 0 ? (
              <p className='text-gray-500'>No contact form submissions yet.</p>
            ) : (
              contactForms.map((item, index) => (
                <div
                  key={item.id}
                  className='bg-white shadow rounded-lg p-5 hover:shadow-md transition flex flex-col gap-2'
                >
                  <div className='flex justify-between text-sm text-black'>
                    <span className='font-medium'>{index + 1}</span>
                    <span>
                      📍 {item.city}, {item.state}
                    </span>
                  </div>

                  <h2 className='text-lg font-semibold text-gray-800'>
                    {item.full_name}
                  </h2>

                  {item.message && (
                    <div className='text-sm text-gray-700'>
                      <p className='font-medium'>Message:</p>
                      <p className='whitespace-pre-line'>{item.message}</p>
                    </div>
                  )}

                  {item.gas_info && (
                    <p className='text-sm text-gray-600'>
                      <span className='font-medium'>Gas Info:</span>{' '}
                      {item.gas_info}
                    </p>
                  )}

                  {item.image_url && (
                    <a
                      href={item.image_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 text-sm underline mt-1 inline-block'
                    >
                      🔍 View Uploaded Image
                    </a>
                  )}

                  <p className='text-xs text-gray-500 mt-2'>
                    🗓 Submitted:{' '}
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {confirmingOrderId && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
              Are you sure?
            </h2>
            <p className='text-sm text-gray-600 mb-6'>
              This will mark the order as completed and cannot be undone.
            </p>

            <div className='flex justify-center gap-4'>
              <button
                onClick={async () => {
                  const { error } = await supabase
                    .from('orders')
                    .update({ status: 'completed' })
                    .eq('id', confirmingOrderId);

                  if (error) {
                    alert('Failed to update status.');
                    console.error(error.message);
                  } else {
                    setOrders((prev) =>
                      prev.map((o) =>
                        o.id === confirmingOrderId
                          ? { ...o, status: 'completed' }
                          : o
                      )
                    );
                    setConfirmingOrderId(null);
                  }
                }}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'
              >
                Yes, Confirm
              </button>
              <button
                onClick={() => setConfirmingOrderId(null)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

      {confirmingTx && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
              Are you sure?
            </h2>
            <p className='text-sm text-gray-600 mb-6'>
              This will mark the order as completed and cannot be undone.
            </p>

            <div className='flex justify-center gap-4'>
              <button
                onClick={async () => {
                  const { error } = await supabase
                    .from('cart_order')
                    .update({ status: 'completed' })
                    .eq('tx_ref', confirmingTx);

                  if (error) {
                    alert('Failed to update status.');
                    console.error(error.message);
                  } else {
                    setCartOrder((prev) =>
                      prev.map((o) =>
                        o.tx_ref === confirmingTx
                          ? { ...o, status: 'completed' }
                          : o
                      )
                    );
                    setConfirmingTx(null); // close modal
                  }
                }}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'
              >
                Yes, Confirm
              </button>
              <button
                onClick={() => setConfirmingTx(null)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
