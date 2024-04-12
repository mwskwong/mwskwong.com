import { ImageResponse } from 'next/og';

import Logo from '@/app/icon.svg?monochrome';

import { getFonts, size } from './config';

export const generateImage = (title: string) => async () =>
  new ImageResponse(
    (
      <div
        style={{
          background: '#FFF', // --joy-palette-background-body
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8 * 8,
        }}
      >
        {/* --joy-palette-primary-plainColor */}
        <Logo fill="#0B6BCB" width={128} />
        <hr
          // https://mui.com/joy-ui/react-divider/#vertical-divider
          style={{
            margin: 0,
            position: 'relative',
            height: 128 - 8 * 2 * 2,
            flexShrink: 0,
            backgroundColor: '#636b7433',
            inlineSize: 1,
          }}
        />
        <h1
          // https://mui.com/joy-ui/customization/default-theme-viewer/
          style={{
            fontWeight: 700,
            fontSize: '5rem',
            lineHeight: 1.33334,
            letterSpacing: '-0.025em',
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      ...size,
      fonts: await getFonts(),
    },
  );
