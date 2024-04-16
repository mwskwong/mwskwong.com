/**
 * For the details of the reason of this file's naming convention:
 * @see {@link https://react.email/docs/cli#how-to-make-the-preview-server-ignore-directories}
 */

import {
  Body,
  Container,
  Text as EmailText,
  Head,
  Html,
  Img,
  TextProps,
} from '@react-email/components';
import { FC, PropsWithChildren } from 'react';

import { baseUrl, websiteDisplayName } from '@/constants/site-config';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Html lang="en">
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
          alt={websiteDisplayName}
          height={50}
          src={`${baseUrl}/apple-icon`}
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
