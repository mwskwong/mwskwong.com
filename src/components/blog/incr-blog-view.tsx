'use client';

import { type FC, useEffect } from 'react';

import { incrBlogViewById } from '@/lib/actions';

export const IncrBlogView: FC<{ blogId: string }> = ({ blogId }) => {
  useEffect(() => void incrBlogViewById(blogId), [blogId]);
  return null;
};
