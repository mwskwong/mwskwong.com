import { Flex, Heading, Link, Section, Text, Tooltip } from '@radix-ui/themes';
import { IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import { type FC } from 'react';

import { getTechStack } from '@/lib/queries';

export const InterestingFact: FC = async () => {
  const techStack = await getTechStack();

  return (
    <Flex asChild align="center" direction="column" gap="8">
      <Section>
        <Flex direction="column" gap="5">
          <Heading align="center" as="h2" size="9">
            Interesting Fact
          </Heading>
          <Text align="center" as="p" className="max-w-xl">
            This website also serves as a testing ground for 🩸 bleeding-edge
            techs and design patterns. Check out the libraries and platforms I
            use to build it.
          </Text>
        </Flex>
        <Flex gap="4" justify="center" wrap="wrap">
          {techStack.map(
            ({ id, name, url, logo }) =>
              logo && (
                <Tooltip key={id} content={name}>
                  <a href={url} rel="noopener" target="_blank">
                    <Image
                      alt={name}
                      className="h-[revert-layer] object-scale-down"
                      height={36}
                      src={logo}
                      width={36}
                    />
                  </a>
                </Tooltip>
              ),
          )}
        </Flex>
        <Flex asChild align="center" gap="3">
          <Link
            href="https://github.com/mwskwong/mwskwong.com"
            rel="noopener"
            target="_blank"
          >
            View the source code
            <IconArrowRight size={20} />
          </Link>
        </Flex>
      </Section>
    </Flex>
  );
};
