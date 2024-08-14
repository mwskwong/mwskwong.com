import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { firstName, lastName } from '@/constants/content';

export const size = { width: 2560, height: 1280 };
export const contentType = 'image/png';

const OpengraphImage = async () => {
  const icon = await readFile(join(process.cwd(), 'public/icon-light.svg'));
  const font = await readFile(
    join(
      process.cwd(),
      'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf',
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFF', // --joy-palette-background-body
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          height={400}
          src={`data:image/svg+xml;base64,${Buffer.from(icon).toString('base64')}`}
          style={{ objectFit: 'contain' }}
          width={400}
        />
        <h1
          // https://mui.com/joy-ui/customization/default-theme-viewer/
          style={{
            fontWeight: 700,
            fontSize: '14rem',
            letterSpacing: '0.025em',
            textTransform: 'uppercase',
            marginTop: 64,
            marginBottom: 0,
          }}
        >
          {firstName}
        </h1>
        <h1
          // https://mui.com/joy-ui/customization/default-theme-viewer/
          style={{
            fontWeight: 700,
            fontSize: '7.5rem',
            letterSpacing: '0.6667em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {lastName}
        </h1>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Geist Sans',
          data: font,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );
};

export default OpengraphImage;
