import { ImageResponse } from 'next/og';

import { siteUrl } from '@/constants/site-config';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const appleIcon = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '22.5%',
          background: '#FFF', // --joy-palette-background-body
        }}
      >
        <img
          height="100%"
          src={`${siteUrl}/icon-light.svg`}
          style={{ objectFit: 'contain' }}
          width="100%"
        />
      </div>
    ),
    size,
  );

export default appleIcon;
