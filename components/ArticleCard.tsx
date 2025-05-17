import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  id: number;
  title: string;
  content: string;
  date: string;
  author?: string;
  image_url?: string;
  onDelete: (id: number) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  content,
  date,
  author,
  image_url,
  onDelete,
}) => {
  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col'>
      {image_url && (
        <div className='h-48 w-full relative'>
          <Image
            src={image_url}
            alt={title}
            fill
            className='object-cover w-full h-full'
          />
        </div>
      )}
      <div className='p-5 flex-1 flex flex-col justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-gray-900 mb-1'>{title}</h2>
          <p className='text-sm text-gray-500 mb-2'>
            {new Date(date).toLocaleDateString()} • {author || 'Unknown'}
          </p>
          <p className='text-sm text-gray-700 line-clamp-3'>{content}</p>
        </div>

        <div className='mt-4 flex justify-end gap-4'>
          <Link
            href={`/admin/pressArticles/edit/${id}`}
            className='text-blue-600 hover:text-blue-800 text-sm font-medium transition'
          >
            ✏️ Edit
          </Link>
          <button
            onClick={() => onDelete(id)}
            className='text-red-600 hover:text-red-800 text-sm font-medium transition'
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
