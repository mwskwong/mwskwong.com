import { privacyPolicy } from '@/constants/nav';
import { createImage } from '@/og-images/route';

// WORKAROUND: explicitly exporting items
// Although it won;t affect the build result,
// using export * will causes the error "Attempted import error: 'null' is not exported from 'opengraph-image.tsx?__next_metadata_image_meta__' (imported as '_null')." to throw
export { size, contentType } from '@/og-images/config';
export const runtime = 'edge';

export default createImage(privacyPolicy.label);
