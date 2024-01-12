import { ImageResponse } from 'next/og';

import Logo from '@/app/icon.svg?monochrome';

// Cannot extract other variables, e.g. runtime, size to here
// or else the following error will occur: TypeError: Failed to parse URL from /_next/static/media/geist-bold.b0ba426e.otf

export const RouteOgImage =
  ({
    title,
    size = { width: 1200, height: 630 },
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* --joy-palette-primary-plainColor */}
          <Logo
            fill="#0B6BCB"
            height={64}
            style={{ position: 'absolute', top: size.height * 0.25 - 64 / 2 }}
          />
          <h1
            // https://mui.com/joy-ui/customization/default-theme-viewer/
            style={{
              fontWeight: 700,
              fontSize: '8rem',
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
