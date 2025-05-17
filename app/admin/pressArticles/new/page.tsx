'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/config/supabaseClient.config';
import { v4 as uuidv4 } from 'uuid';

const NewArticle: React.FC = () => {
  const [headerImage, setHeaderImage] = useState<File | null>(null);
  const [markdownText, setMarkdownText] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setHeaderImage(file);
  };

  const handleSave = async () => {
    setLoading(true);
    let imageUrl = '';

    try {
      // Upload image
      if (headerImage) {
        const ext = headerImage.name.split('.').pop();
        const fileName = `${uuidv4()}.${ext}`;
        const filePath = `article_images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('press')
          .upload(filePath, headerImage);

        if (uploadError) throw new Error('Image upload failed');

        const { publicUrl } = supabase.storage
          .from('press')
          .getPublicUrl(filePath).data;

        imageUrl = publicUrl;
      }

      // Save article
      const { data, error } = await supabase
        .from('press_articles')
        .insert([
          {
            title: title || 'Untitled',
            content: markdownText,
            image_url: imageUrl,
            date: new Date().toISOString().split('T')[0],
            author: author || 'Anonymous',
          },
        ])
        .select()
        .single();

      if (error || !data) throw new Error('Error saving article');

      // Redirect
      router.push(`/admin/pressArticles/new/preview/${data.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Create New Article</h1>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Title</label>
        <input
          type='text'
          className='w-full border rounded p-2'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Article title'
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Author</label>
        <input
          type='text'
          className='w-full border rounded p-2'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='Author name'
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Header Image</label>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='w-full'
        />
      </div>

      <div className='mb-6'>
        <label className='block mb-1 font-medium'>
          Article Content (Markdown)
        </label>
        <textarea
          className='w-full h-80 border rounded p-3'
          value={markdownText}
          onChange={(e) => setMarkdownText(e.target.value)}
          placeholder='Write your article in markdown...'
        />
      </div>

      <button
        onClick={handleSave}
        className='px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700'
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save & Preview'}
      </button>
    </div>
  );
};

export default NewArticle;
