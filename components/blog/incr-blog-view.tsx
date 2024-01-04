'use client';

import { FC, memo, useEffect } from 'react';

import { incrBlogViewById } from '@/lib/actions';

export const IncrBlogView: FC<{ blogId: string }> = memo(({ blogId }) => {
  useEffect(() => void incrBlogViewById(blogId), [blogId]);
  return null;
});
