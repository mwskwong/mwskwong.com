import { Section, Text } from '@radix-ui/themes';
import { type FC } from 'react';

import { legalName, techFocus } from '@/constants/me';

// eslint-disable-next-line @typescript-eslint/require-await -- "use cache" functions must be async functions.
export const Footer: FC = async () => {
  'use cache';

  return (
    <Section asChild>
      <footer>
        <Text as="p" className="max-w-[60ch]" color="gray" size="2">
          {techFocus}
        </Text>
        <Text as="p" className="max-w-[60ch]" color="gray" mt="2" size="1">
          Copyright © {new Date().getFullYear()} {legalName}
        </Text>
      </footer>
    </Section>
  );
};
