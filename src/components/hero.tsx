import { Button, Flex, Heading, Section } from '@radix-ui/themes';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { type FC } from 'react';

import { firstName, headline, lastName, linkedin } from '@/constants/me';
import { getCv } from '@/lib/queries';

export const Hero: FC = async () => {
  const cv = await getCv();

  return (
    <Section>
      <Heading mb="4" size="9">
        {firstName} {lastName}
      </Heading>
      <Heading as="h2" color="indigo" size="8">
        {headline}
      </Heading>
      <Flex direction={{ initial: 'column', sm: 'row' }} gap="5" mt="8">
        <Button highContrast color="gray" size="4">
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
  );
};
