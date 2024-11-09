import {
  Body,
  Container,
  Hr as EmailHr,
  Text as EmailText,
  type HrProps,
  Html,
  Img,
  type TextProps,
} from '@react-email/components';
import { type FC, type PropsWithChildren } from 'react';

import { siteDisplayName, siteUrl } from '@/constants/site-config';

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
          alt={siteDisplayName}
          height={50}
          src={`${siteUrl}/apple-icon`}
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
