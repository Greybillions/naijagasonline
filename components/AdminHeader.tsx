import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminHeader = ({ handleLogout }: { handleLogout: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className='flex justify-between items-center mb-6 relative'>
      <h1 className='text-2xl md:text-3xl font-bold'>Admin Dashboard</h1>

      {/* Hamburger */}
      <div className='relative'>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className='text-gray-700 border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring'
        >
          ☰
        </button>

        {menuOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50'>
            <button
              onClick={() => {
                router.push('/admin/pressArticles');
                setMenuOpen(false);
              }}
              className='w-full text-left px-4 py-2 hover:bg-gray-100 text-sm'
            >
              📰 Manage Press Articles
            </button>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className='w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 text-sm'
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
