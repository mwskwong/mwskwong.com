import { CodeInline, Link } from '@react-email/components';
import { type userAgent } from 'next/server';

import { firstName } from '@/constants/content';
import { env } from '@/env.mjs';

import { CodeBlock, Layout, Text } from './_components';

export interface AlertProps {
  digest?: string;
  stack?: string;
  userAgent: ReturnType<typeof userAgent>;
}

export const Alert = ({ digest, stack, userAgent }: AlertProps) => (
  <Layout>
    <Text>Hi {firstName},</Text>
    <Text>
      An unhandled error is thrown from{' '}
      <Link href={env.NEXT_PUBLIC_SITE_URL}>
        {env.NEXT_PUBLIC_SITE_DISPLAY_NAME}
      </Link>
      .
    </Text>
    <Text>
      <span style={{ fontWeight: 700 }}>Digest: </span>
      <CodeInline style={{ fontSize: '0.875rem' }}>{digest}</CodeInline>
    </Text>
    {stack ? (
      <>
        <Text style={{ fontWeight: 700 }}>Stack:</Text>
        <CodeBlock code={stack} language="log" />
      </>
    ) : null}
    <Text style={{ fontWeight: 700 }}>User Agent:</Text>
    <CodeBlock code={JSON.stringify(userAgent, null, 2)} language="json" />
  </Layout>
);

Alert.PreviewProps = {
  digest: '4253948048',
  stack:
    'PrismaClientInitializationError: \n' +
    'Invalid `prisma.contactFormSubmission.findMany()` invocation:\n' +
    '\n' +
    '\n' +
    'Error querying the database: ERROR: Console request failed: endpoint is temporary unavailable. check your quotas and/or contact our support\n' +
    '    at In.handleRequestError (node_modules/@prisma/client/runtime/library.js:122:7154)\n' +
    '    at In.handleAndLogRequestError (node_modules/@prisma/client/runtime/library.js:122:6188)\n' +
    '    at In.request (node_modules/@prisma/client/runtime/library.js:122:5896)\n' +
    '    at async l (node_modules/@prisma/client/runtime/library.js:127:11167)',
  userAgent: {
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0',
    browser: { name: 'Edge', version: '123.0.0.0' },
    engine: { name: 'Blink', version: '123.0.0.0' },
    os: { name: 'Windows', version: '10' },
    device: { vendor: undefined, model: undefined, type: undefined },
    cpu: { architecture: 'amd64' },
    isBot: false,
  },
} satisfies AlertProps;

export default Alert;
