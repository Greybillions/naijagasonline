'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/config/supabaseClient.config';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

const EditPressArticle = () => {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('press_articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching article:', error.message);
      } else if (data) {
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author || '');
        setDate(data.date);
        setImageUrl(data.image_url || '');
      }

      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const filename = `${uuidv4()}-${file.name}`;
    const { error } = await supabase.storage
      .from('press-articles')
      .upload(filename, file);

    if (error) {
      console.error('Image upload failed:', error.message);
      return null;
    }

    const { data: urlData } = await supabase.storage
      .from('press-articles')
      .getPublicUrl(filename);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let updatedImageUrl = imageUrl;

    if (newImageFile) {
      const uploadedUrl = await handleImageUpload(newImageFile);
      if (uploadedUrl) {
        updatedImageUrl = uploadedUrl;
      }
    }

    const { error } = await supabase
      .from('press_articles')
      .update({
        title,
        content,
        author,
        date,
        image_url: updatedImageUrl,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating article:', error.message);
    } else {
      alert('Article updated successfully!');
      router.push('/admin/pressArticles');
    }
  };

  if (loading) return <div className='p-6'>Loading article...</div>;

  return (
    <div className='max-w-3xl mx-auto px-6 py-12'>
      <h1 className='text-2xl font-bold mb-6'>Edit Press Article</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border p-2 rounded'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='w-full border p-2 rounded'
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>Date</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='w-full border p-2 rounded'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>
            Content (Markdown)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className='w-full border p-2 rounded'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>Current Image</label>
          {imageUrl && (
            <Image
              src={imageUrl}
              width={800}
              height={400}
              alt='Current header'
              className='w-full h-64 object-cover rounded mb-2'
            />
          )}
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
            className='w-full border p-2 rounded'
          />
        </div>

        <button
          type='submit'
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPressArticle;
