'use client';

import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={clsx('animate-pulse bg-gray-300 w-full rounded-md', className)}
    ></div>
  );
};

export default Skeleton;
