import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const generatePdfThumbnail = (url: string, width = 512) =>
  `https://image.thum.io/get/pdfSource/width/${width}/page/1/${url}`;
