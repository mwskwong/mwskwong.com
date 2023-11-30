import { headers } from 'next/headers';

export const authorized = () => {
  const token = headers().get('Authorization')?.split('Bearer ')[1];
  return token === process.env.API_TOKEN;
};
