'use client';

import { type FC } from 'react';

import { Error } from '@/components/error';

const RouteError: FC = () => (
  <Error message="Something went wrong." statusCode="Oops" />
);

export default RouteError;
