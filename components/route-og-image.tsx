import { ImageResponse } from 'next/og';

import Logo from '@/app/icon.svg?monochrome';

// Cannot extract other variables, e.g. runtime, size to here
// or else the following error will occur: TypeError: Failed to parse URL from /_next/static/media/geist-bold.b0ba426e.otf

export const RouteOgImage =
  ({
    title,
    size,
  }: {
    title: string;
    size?: { width: number; height: number };
  }) =>
  async () =>
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
        fonts: [
          {
            name: 'Geist',
            data: await fetch(
              new URL('@/fonts/geist-bold.otf', import.meta.url),
            ).then((res) => res.arrayBuffer()),
            weight: 700,
            style: 'normal',
          },
        ],
      },
    );
