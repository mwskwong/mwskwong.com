import { Flex, type FlexProps, Title } from '@mantine/core';
import { type FC } from 'react';

import { Image } from '../image';

export const Logo: FC<FlexProps> = (props) => {
  return (
    <Flex align="center" gap="sm" {...props}>
      <Image
        alt="logo"
        height={30}
        srcDark="/icon-dark.svg"
        srcLight="/icon-light.svg"
        width={30}
      />
      <Title order={2}>Matthew</Title>
    </Flex>
  );
};
