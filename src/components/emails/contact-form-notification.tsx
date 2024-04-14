import { Link } from '@react-email/components';
import dedent from 'dedent';

import { firstName } from '@/constants/content';

import { Layout, Text } from './_components';

export interface ContactFormNotificationProps {
  name: string;
  email?: string;
  message: string;
  showInGuestbook: boolean;
}

export const ContactFormNotification = ({
  name,
  email,
  message,
  showInGuestbook,
}: ContactFormNotificationProps) => (
  <Layout>
    <Text>Hi {firstName},</Text>
    <Text>
      You got a new{' '}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '1.5rem',
          paddingLeft: 8,
          paddingRight: 8,
          fontSize: '0.875rem',
          backgroundColor: showInGuestbook ? '#E3FBE3' : '#FDF0E1',
          color: showInGuestbook ? '#0A470A' : '#492B08',
          minHeight: '1.5rem',
        }}
      >
        {showInGuestbook ? 'Public' : 'Private'}
      </span>{' '}
      message from {email ? <Link href={`mailto:${email}`}>{name}</Link> : name}
      :
    </Text>
    <pre style={{ fontFamily: 'sans-serif' }}>
      <blockquote
        style={{
          paddingLeft: 8,
          paddingRight: 8,
          borderLeft: `3px solid #CDD7E1`,
          margin: 0,
        }}
      >
        <Text>{message}</Text>
      </blockquote>
    </pre>
  </Layout>
);

ContactFormNotification.PreviewProps = {
  name: 'John Doe',
  email: 'john@example.com',
  message: dedent(`
    Hello world! 👋
    <script>
      alert("Hello\\nHow are you?");
    </script>
  `),
  showInGuestbook: false,
} satisfies ContactFormNotificationProps;

export default ContactFormNotification;
