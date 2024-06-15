import { ImageResponse } from 'next/og';

import Icon from '@/app/icon.svg?monochrome';
import { firstName, lastName } from '@/constants/content';

export const size = { width: 2560, height: 1280 };
export const contentType = 'image/png';
export const runtime = 'edge';

const OpengraphImage = async () =>
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
        <Icon fill="#0B6BCB" width={400} />
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

export default OpengraphImage;
