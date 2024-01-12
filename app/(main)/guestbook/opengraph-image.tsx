import { RouteOgImage } from '@/components/route-og-image';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default RouteOgImage({ title: 'Guestbook', size });
