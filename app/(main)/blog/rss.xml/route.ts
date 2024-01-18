import { baseUrl } from '@/constants/base-url';
import { email, firstName, lastName } from '@/constants/content';
import { blog } from '@/constants/nav';
import { getBlogs } from '@/lib/queries';

const encodeHtmlEntities = (str: string) =>
  str.replace(/[\u00A0-\u9999<>&]/gim, (i) => `&#${i.charCodeAt(0)};`);

export const GET = async () => {
  const blogs = await getBlogs();
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">     
    <channel>
      <title>${firstName} ${lastName} Blog</title>
      <link>${baseUrl}${blog.pathname}</link>
      <description>Personal perspectives on a broad range of topics.</description>
      <language>en</language>
      ${blogs
        .map(
          ({ title, slug, description, categories = [], createdAt }) => `
            <item>
              <title>${title}</title>
              <link>${baseUrl}${blog.pathname}/${slug}</link>
              <description>${encodeHtmlEntities(description)}</description>
              <author>${email} (${firstName} ${lastName})</author>
              ${categories.map((category) => `<category>${category}</category>`).join('')}
              <pubDate>${new Date(createdAt).toUTCString()}</pubDate>
            </item>
          `,
        )
        .join('')}
    </channel> 
    </rss>`,
    { headers: { 'Content-Type': 'text/xml' } },
  );
};
