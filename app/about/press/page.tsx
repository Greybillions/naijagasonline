'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/config/supabaseClient.config';
import { marked } from 'marked';

type PressArticle = {
  id: number;
  title: string;
  content: string;
  date: string;
  author?: string;
  image_url?: string;
};

const PressPage = () => {
  const [articles, setArticles] = useState<PressArticle[]>([]);
  const [previews, setPreviews] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('press_articles')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error.message);
      } else {
        setArticles(data || []);
        generatePreviews(data || []);
      }
    };

    const generatePreviews = async (articles: PressArticle[]) => {
      const previewMap: Record<number, string> = {};

      for (const article of articles) {
        const html = await marked.parse(article.content || '');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        previewMap[article.id] =
          text.length > 200 ? text.slice(0, 200) + '…' : text;
      }

      setPreviews(previewMap);
    };

    fetchArticles();
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 max-w-5xl mx-auto px-4 py-12'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Press & Media</h1>
        <p className='text-gray-600 mb-8'>
          Find our latest announcements, media assets, and brand resources. For
          press inquiries, reach out to{' '}
          <a
            href='mailto:naijagasonline@gmail.com'
            className='text-green-600 font-medium hover:underline'
          >
            naijagasonline@gmail.com
          </a>
          .
        </p>

        {articles.length === 0 ? (
          <p className='text-center text-gray-500'>
            No press articles available yet.
          </p>
        ) : (
          <section className='space-y-6'>
            {articles.map((article) => (
              <article
                key={article.id}
                className='bg-white shadow rounded-lg p-6'
              >
                {article.image_url && (
                  <div className='mb-4'>
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      width={800}
                      height={400}
                      className='w-full h-64 object-fit rounded-md'
                    />
                  </div>
                )}
                <h2 className='text-xl font-semibold text-gray-800 mb-1'>
                  {article.title}
                </h2>
                <p className='text-sm text-gray-500'>
                  {new Date(article.date).toLocaleDateString()} •{' '}
                  {article.author || 'NaijaGas Team'}
                </p>
                <p className='text-sm text-gray-700 mt-2'>
                  {previews[article.id] || 'Loading...'}
                </p>
                <Link
                  href={`/admin/pressArticles/new/preview/${article.id}`}
                  className='inline-block mt-3 text-green-600 text-sm font-medium hover:underline'
                >
                  Read full article →
                </Link>
              </article>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PressPage;
