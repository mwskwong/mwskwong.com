/**
 * For the details of the reason of this file's naming convention:
 * @see {@link https://react.email/docs/cli#how-to-make-the-preview-server-ignore-directories}
 */

import {
  Body,
  Container,
  Hr as EmailHr,
  Text as EmailText,
  Head,
  type HrProps,
  Html,
  Img,
  type TextProps,
} from '@react-email/components';
import { type FC, type PropsWithChildren } from 'react';

import { env } from '@/env.mjs';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Html>
    <Head />
    <Body
      style={{
        color: '#32383E',
        fontFamily: 'sans-serif',
        backgroundColor: '#FFF',
      }}
    >
      <Container style={{ paddingTop: 8 * 3, paddingBottom: 8 * 6 }}>
        <Img
          alt={env.NEXT_PUBLIC_SITE_DISPLAY_NAME}
          height={50}
          src={`${env.NEXT_PUBLIC_SITE_URL}/apple-icon`}
          width={50}
          style={{
            margin: 'auto',
            border: `1px solid #CDD7E1`,
            borderRadius: '25%',
          }}
        />
        {children}
      </Container>
    </Body>
  </Html>
);

export const Text: FC<TextProps> = ({ style, ...props }) => (
  <EmailText
    style={{
      fontSize: '1rem',
      lineHeight: 1.5,
      ...style,
    }}
    {...props}
  />
);

export const Hr: FC<HrProps> = ({ style, ...props }) => (
  <EmailHr
    style={{
      borderColor: '#636b7433',
      ...style,
    }}
    {...props}
  />
);
