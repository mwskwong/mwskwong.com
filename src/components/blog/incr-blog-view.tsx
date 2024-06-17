'use client';

import { type FC, useEffect } from 'react';

import { incrBlogViewById } from '@/lib/actions';

export interface IncrBlogViewProps {
  blogId: string;
}

export const IncrBlogView: FC<IncrBlogViewProps> = ({ blogId }) => {
  useEffect(() => void incrBlogViewById(blogId), [blogId]);

  return null;
};
