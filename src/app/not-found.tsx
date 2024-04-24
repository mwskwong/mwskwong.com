import { type Metadata } from 'next';
import { type FC } from 'react';

import { Error } from '@/components/error';

const NotFound: FC = () => (
  <Error message="This page could not be found." statusCode={404} />
);

export const metadata = { title: 'Not Found' } satisfies Metadata;

export default NotFound;
