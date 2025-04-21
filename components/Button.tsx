'use client';

import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  children: React.ReactNode;
  url?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
};

const Button = ({
  children,
  url,
  onClick,
  variant = 'primary',
  className,
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center px-10 py-3 rounded-full font-medium transition-all duration-200';

  const variants = {
    primary: 'bg-primary text-white transition-all hover:opacity-90',
    ghost: 'bg-transparent text-gray-800 transition-all hover:opacity-80',
  };

  const finalClassName = twMerge(baseStyles, variants[variant], className);

  if (url) {
    return (
      <Link href={url} className={finalClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={finalClassName}>
      {children}
    </button>
  );
};

export default Button;
