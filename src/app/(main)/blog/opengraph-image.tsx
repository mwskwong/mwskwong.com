import { blog } from '@/constants/nav';
import { generateImage } from '@/og-images/route';

export { size, contentType } from '@/og-images/config';
export const runtime = 'edge';

export default generateImage(blog.label);
