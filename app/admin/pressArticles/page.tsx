'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/config/supabaseClient.config';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  content: string;
  date: string;
  author?: string;
  image_url?: string;
}

const PressArticles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('press_articles')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error.message);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this article?');
    if (!confirmed) return;

    const { error } = await supabase
      .from('press_articles')
      .delete()
      .eq('id', id);
    if (error) {
      alert('Failed to delete article.');
    } else {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className='max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
      <div className='flex justify-between flex-col mb-8 gap-3'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
          📰 Press/Media Articles
        </h1>
        <Link
          href='/admin/pressArticles/new'
          className='inline-flex items-center bg-blue-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-md shadow transition mx-auto'
        >
          ✏️ Add an Article
        </Link>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-48'>
          <div className='h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : articles.length === 0 ? (
        <p className='text-gray-500 text-center'>No press articles found.</p>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {articles.map((article) => (
            <div
              key={article.id}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col'
            >
              {article.image_url && (
                <div className='h-48 w-full relative'>
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    className='object-cover w-full h-full'
                  />
                </div>
              )}
              <div className='p-5 flex-1 flex flex-col justify-between'>
                <div>
                  <h2 className='text-lg font-semibold text-gray-900 mb-1'>
                    {article.title}
                  </h2>
                  <p className='text-sm text-gray-500 mb-2'>
                    {new Date(article.date).toLocaleDateString()} •{' '}
                    {article.author || 'Unknown'}
                  </p>
                  <p className='text-sm text-gray-700 line-clamp-3'>
                    {article.content}
                  </p>
                </div>

                <div className='mt-4 flex justify-end gap-4'>
                  <Link
                    href={`/admin/pressArticles/edit/${article.id}`}
                    className='text-blue-600 hover:text-blue-800 text-sm font-medium transition'
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className='text-red-600 hover:text-red-800 text-sm font-medium transition'
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PressArticles;
