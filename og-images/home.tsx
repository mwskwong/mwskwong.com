import { ImageResponse } from 'next/og';

import Logo from '@/app/icon.svg?monochrome';
import { firstName, lastName } from '@/constants/content';

import { size } from './config';

export const Image = async () =>
  new ImageResponse(
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
        {/* --joy-palette-primary-plainColor */}
        <Logo fill="#0B6BCB" width={200} />
        <h1
          // https://mui.com/joy-ui/customization/default-theme-viewer/
          style={{
            fontWeight: 700,
            fontSize: '7rem',
            letterSpacing: '0.025em',
            textTransform: 'uppercase',
            marginTop: 32,
            marginBottom: 0,
          }}
        >
          {firstName}
        </h1>
        <h1
          // https://mui.com/joy-ui/customization/default-theme-viewer/
          style={{
            fontWeight: 700,
            fontSize: '3.75rem',
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
          name: 'Geist',
          data: await fetch(
            new URL(
              'geist/assets/fonts/geist-sans/Geist-Bold.ttf',
              import.meta.url,
            ),
          ).then((res) => res.arrayBuffer()),
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );
