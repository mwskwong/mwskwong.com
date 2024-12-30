import { Section, type SectionProps, Text } from '@radix-ui/themes';
import { type FC } from 'react';

import { legalName, techFocus } from '@/constants/me';

export type FooterProps = Omit<SectionProps, 'asChild' | 'children'>;

export const Footer: FC<FooterProps> = (props) => (
  <Section asChild {...props}>
    <footer>
      <Text as="p" className="max-w-[50ch]" color="gray" size="2">
        {techFocus}
      </Text>
      <Text as="p" color="gray" mt="2" size="1">
        Copyright © {new Date().getFullYear()} {legalName}
      </Text>
    </footer>
  </Section>
);
