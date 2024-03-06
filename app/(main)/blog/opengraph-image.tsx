import { blog } from '@/constants/nav';
import { createImage } from '@/og-images/route';

export { size, contentType } from '@/og-images/config';
export const runtime = 'edge';

export default createImage(blog.label);
