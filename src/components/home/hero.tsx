import {
  Button,
  Flex,
  type FlexProps,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { type FC } from 'react';

import { firstName, headline, lastName, linkedin } from '@/constants/me';
import { getCv } from '@/lib/queries';

export type HeroProps = Omit<FlexProps, 'asChild' | 'children'>;
export const Hero: FC<HeroProps> = async (props) => {
  const cv = await getCv();

  return (
    <Flex asChild align={{ sm: 'center' }} direction="column" {...props}>
      <Section>
        <Heading size="9">
          {firstName} {lastName}
        </Heading>
        <Heading asChild color="indigo" mt="4" size="7">
          <p>{headline}</p>
        </Heading>
        <Text align={{ sm: 'center' }} as="p" className="max-w-xl" mt="8">
          I&apos;m passionate about 🧠 innovative technologies, 😍 user
          experience web, and ♿️ accessibility.
        </Text>
        <Flex direction={{ initial: 'column', sm: 'row' }} gap="4" mt="8">
          <Button asChild highContrast color="gray" size="4">
            <a href={cv} rel="noopener" target="_blank">
              Download CV
            </a>
          </Button>
          <Button asChild highContrast size="4" variant="soft">
            <a href={linkedin} rel="noopener" target="_blank">
              <IconBrandLinkedin size={18} />
              LinkedIn
            </a>
          </Button>
        </Flex>
      </Section>
    </Flex>
  );
};
