import { type ClassValue, clsx } from 'clsx';
import { unstable_cache as nextCache } from 'next/cache';
import { cache as reactCache } from 'react';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const generatePdfThumbnail = (url: string, width = 16 * 12 * 4) =>
  `https://image.thum.io/get/pdfSource/width/${width}/page/1/${url}`;

export const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

// simulate "use cache" behavior
export const cache: typeof nextCache = (cb, keyParts, options) =>
  reactCache(nextCache(cb, keyParts, { revalidate: 15 * 60, ...options }));
