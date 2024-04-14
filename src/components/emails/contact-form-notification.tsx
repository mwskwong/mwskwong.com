import { Link } from '@react-email/components';
import dedent from "dedent";

import { firstName } from '@/constants/content';

import { Layout, Text } from './_components';

export interface ContactFormNotificationProps {
  name: string;
  email?: string;
  message: string;
}

export const ContactFormNotification = ({
  name,
  email,
  message,
}: ContactFormNotificationProps) => (
  <Layout>
    <Text>Hi {firstName},</Text>
    <Text>
      You got a new message from{' '}
      {email ? <Link href={`mailto:${email}`}>{name}</Link> : name}:
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
} satisfies ContactFormNotificationProps;

export default ContactFormNotification;
