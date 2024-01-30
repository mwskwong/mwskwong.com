import { guestbook } from '@/constants/nav';

import { routeOgImage } from '../route-og-image';

export const runtime = 'edge';
export { size, contentType } from '../route-og-image';
export default routeOgImage(guestbook.label);
