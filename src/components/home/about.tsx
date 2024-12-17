import {
  Flex,
  type FlexProps,
  Heading,
  Link,
  Section,
  Text,
} from '@radix-ui/themes';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandStackoverflow,
  IconMail,
} from '@tabler/icons-react';
import Image from 'next/image';
import { type FC } from 'react';

import {
  email,
  github,
  linkedin,
  selfIntroduction,
  stackoverflow,
} from '@/constants/me';
import { getPersonalPortrait } from '@/lib/queries';

const links = [
  { Icon: IconMail, href: `mailto:${email}`, name: 'Email' },
  { Icon: IconBrandLinkedin, href: linkedin, name: 'LinkedIn' },
  { Icon: IconBrandGithub, href: github, name: 'GitHub' },
  { Icon: IconBrandStackoverflow, href: stackoverflow, name: 'Stack Overflow' },
];
export type AboutProps = Omit<FlexProps, 'asChild' | 'children'>;
export const About: FC = async (props) => {
  const { url: personalPortrait } = await getPersonalPortrait();

  return (
    <Flex
      asChild
      direction={{ initial: 'column', sm: 'row' }}
      gap="8"
      {...props}
    >
      <Section>
        <Heading as="h2" className="flex-1" size="9">
          {personalPortrait ? (
            <Image
              alt="personal portrait"
              className="mr-rx-4 inline-block rounded-full border-4 border-accentA-8 align-top"
              height={60}
              src={personalPortrait}
              width={60}
            />
          ) : null}
          I develop <Text data-accent-color="">full stack web apps</Text>
        </Heading>
        <Flex className="flex-1" direction="column" gap="8">
          <Text as="p">{selfIntroduction}</Text>
          <Flex gap="4" wrap="wrap">
            {links.map(({ Icon, href, name }) => (
              <Flex key={href} asChild align="center" gap="3">
                <Link href={href} target="_blank">
                  <Icon size={20} />
                  {name}
                </Link>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Section>
    </Flex>
  );
};
