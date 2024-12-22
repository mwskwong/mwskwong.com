import {
  Button,
  Flex,
  type FlexProps,
  Heading,
  Section,
  Text,
  Tooltip,
} from '@radix-ui/themes';
import Image from 'next/image';
import { type FC } from 'react';

import { getTechStack } from '@/lib/queries';

export type InterestingFactProps = Omit<FlexProps, 'asChild' | 'children'>;
export const InterestingFact: FC<InterestingFactProps> = async (props) => {
  const techStack = await getTechStack();

  return (
    <Flex
      asChild
      align={{ sm: 'center' }}
      direction="column"
      gap="8"
      {...props}
    >
      <Section>
        <Flex direction="column" gap="5">
          <Heading align="center" as="h2" size="8">
            Interesting Fact
          </Heading>
          <Text align="center" as="p" className="max-w-xl">
            This website also serves as my testing ground for 🩸 bleeding-edge
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
        <Text align="center">And more...</Text>
        <Button asChild highContrast color="gray" size="4">
          <a
            href="https://github.com/mwskwong/mwskwong.com"
            rel="noopener"
            target="_blank"
          >
            View the source code
          </a>
        </Button>
      </Section>
    </Flex>
  );
};
