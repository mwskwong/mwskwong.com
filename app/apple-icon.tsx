import { ImageResponse } from 'next/og';

import Logo from '@/app/icon.svg?monochrome';

export const runtime = 'edge';
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
          padding: 16,
        }}
      >
        {/* --joy-palette-primary-plainColor */}
        <Logo fill="#0B6BCB" width="100%" />
      </div>
    ),
    size,
  );

export default appleIcon;
