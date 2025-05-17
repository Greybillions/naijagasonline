// app/preview/[id].tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/config/supabaseClient.config';
import { marked } from 'marked';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Article {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  date: string;
  author: string;
}

const PreviewPage = () => {
  const params = useParams();
  const id =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : '';

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('press_articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching article:', error);
      } else {
        setArticle(data);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div className='p-6'>Loading...</div>;

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 max-w-3xl mx-auto px-6 py-12'>
        {article.image_url && (
          <Image
            src={article.image_url}
            width={800}
            height={400}
            alt='Header'
            className='w-full h-64 object-fit rounded mb-6'
          />
        )}
        <h1 className='text-3xl font-bold mb-2'>{article.title}</h1>
        <p className='text-sm text-gray-500 mb-4'>
          {article.author} • {article.date}
        </p>
        <div
          className='prose prose-lg max-w-none article'
          dangerouslySetInnerHTML={{
            __html: marked.parse(article.content || ''),
          }}
        />
      </main>

      <Footer />
    </div>
  );
};

export default PreviewPage;
