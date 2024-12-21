'use client';

import { Button, type ButtonProps } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';

export type BackButtonProps = Omit<ButtonProps, 'children'>;
export const BackButton: FC<ButtonProps> = (props) => {
  const router = useRouter();
  return <Button onClick={() => router.back()} {...props} />;
};
