import { Button, Heading, Section, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { type FC } from 'react';

import { selfIntroduction } from '@/constants/me';
import { getPersonalPortrait, getResume } from '@/lib/queries';

export const About: FC = async () => {
  const [{ url: personalPortrait }, resume] = await Promise.all([
    getPersonalPortrait(),
    getResume(),
  ]);
  return (
    <Section>
      <Heading size="9">
        {personalPortrait ? (
          <Image
            alt="personal portrait"
            className="mr-rx-4 inline-block rounded-full border-2 border-accentA-8 align-top"
            height={64}
            src={personalPortrait}
            width={64}
          />
        ) : null}
        I develop <Text data-accent-color="">full stack web apps</Text>
      </Heading>
      <Text as="p" mt="4">
        {selfIntroduction}
      </Text>
      <Button asChild highContrast color="gray" mt="6" size="4">
        <a href={resume} rel="noopener" target="_blank">
          Download Resume
        </a>
      </Button>
    </Section>
  );
};
