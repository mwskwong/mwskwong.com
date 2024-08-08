import { readFile } from 'node:fs/promises';

import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const appleIcon = async () => {
  const icon = await readFile('public/icon-light.svg');
  const paddingInPercentage = 22.5 / 100;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFF', // --joy-palette-background-body
        }}
      >
        <img
          height={size.height * (1 - paddingInPercentage * 2)}
          src={`data:image/svg+xml;base64,${Buffer.from(icon).toString('base64')}`}
          style={{ objectFit: 'contain' }}
          width={size.width * (1 - paddingInPercentage * 2)}
        />
      </div>
    ),
    size,
  );
};

export default appleIcon;
