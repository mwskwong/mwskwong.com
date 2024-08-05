/**
 * For the reason of this file's naming convention:
 * @see {@link https://react.email/docs/cli#how-to-make-the-preview-server-ignore-directories}
 */

import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Hr as EmailHr, type HrProps } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Text as EmailText, type TextProps } from '@react-email/text';
import { type FC, type PropsWithChildren } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Html>
    <Body
      style={{
        color: '#32383E',
        fontFamily: 'sans-serif',
        backgroundColor: '#FFF',
      }}
    >
      <Container style={{ paddingTop: 8 * 3, paddingBottom: 8 * 6 }}>
        <Img
          alt={process.env.NEXT_PUBLIC_SITE_DISPLAY_NAME}
          height={50}
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/apple-icon`}
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
