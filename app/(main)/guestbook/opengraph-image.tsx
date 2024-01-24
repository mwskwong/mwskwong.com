import { guestbook } from '@/constants/nav';

import { routeOgImage } from '../route-og-image';

export const runtime = 'edge';
export default routeOgImage({ title: guestbook.label });
