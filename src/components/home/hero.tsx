import { Button, Flex, Heading, Section, Text } from '@radix-ui/themes';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { type FC } from 'react';

import { firstName, headline, lastName, linkedin } from '@/constants/me';
import { getCv } from '@/lib/queries';

export const Hero: FC = async () => {
  const cv = await getCv();

  return (
    <Section asChild>
      <Flex align={{ sm: 'center' }} direction="column">
        <Heading size="9">
          {firstName} {lastName}
        </Heading>
        <Heading as="h2" color="indigo" mt="4" size="7">
          {headline}
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
      </Flex>
    </Section>
  );
};
