import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Section } from "@radix-ui/themes/components/section";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import { type FC } from "react";

import { selfIntroduction } from "@/constants/me";
import { getPersonalPortrait, getResume } from "@/lib/queries";

import styles from "./about.module.css";

export type AboutProps = Omit<FlexProps, "asChild" | "children">;
export const About: FC<AboutProps> = async (props) => {
  const [personalPortrait, resume] = await Promise.all([
    getPersonalPortrait(),
    getResume(),
  ]);

  return (
    <Flex asChild align={{ sm: "start" }} direction="column" {...props}>
      <Section>
        <Heading as="h2" size="9">
          {personalPortrait && (
            <Box asChild display="inline-block" mr="4">
              <Image
                alt="personal portrait"
                className={styles.personalPortrait}
                height={60}
                src={personalPortrait}
                width={60}
              />
            </Box>
          )}
          I develop <Text data-accent-color="">full stack web apps</Text>
        </Heading>
        <Text as="p" mt="5">
          {selfIntroduction}
        </Text>
        <Button asChild highContrast color="gray" mt="6" size="4">
          <a href={resume} rel="noreferrer" target="_blank">
            Download Resume
          </a>
        </Button>
      </Section>
    </Flex>
  );
};
