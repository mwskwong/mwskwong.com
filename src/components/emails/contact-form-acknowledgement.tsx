import { firstName } from '@/constants/content';

import { Hr, Layout, Text } from './components';

export interface ContactFormAcknowledgementProps {
  name: string;
}

export const ContactFormAcknowledgement = ({
  name,
}: ContactFormAcknowledgementProps) => (
  <Layout>
    <Text>Hi {name},</Text>
    <Text>
      Thank you for reaching out. I just wanted to let you know that I&apos;ve
      received your message, and I appreciate you taking the time to write to
      me. I aim to reply within 48 hours, so you&apos;ll hear from me soon.
    </Text>
    <Text>
      Best,
      <br />
      {firstName}
    </Text>
    <Hr />
    <Text style={{ fontSize: '0.875rem', color: '#555E68' }}>
      **Please note: This is an automated response. Your email has not been read
      yet, but it will be soon!**
    </Text>
  </Layout>
);

ContactFormAcknowledgement.PreviewProps = {
  name: 'John Doe',
} satisfies ContactFormAcknowledgementProps;

export default ContactFormAcknowledgement;
