import { Link } from '@react-email/components';

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
      <Text
        style={{
          padding: '0.75rem',
          borderRadius: 6,
          fontSize: '0.875rem',
          backgroundColor: '#F0F4F8',
        }}
      >
        {message}
      </Text>
    </pre>
  </Layout>
);

ContactFormNotification.PreviewProps = {
  name: 'John Doe',
  email: 'john@example.com',
  message: `Hello world! 👋
<script>
  alert("Hello\\nHow are you?");
</script>`,
} satisfies ContactFormNotificationProps;

export default ContactFormNotification;
