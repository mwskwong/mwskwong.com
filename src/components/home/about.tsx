import styles from "./about.module.css";
import { selfIntroduction } from "@/constants/me";
import { getPersonalPortrait, getResume } from "@/lib/queries";
import {
  Box,
  Button,
  Flex,
  type FlexProps,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import { type FC } from "react";

export type AboutProps = Omit<FlexProps, "asChild" | "children">;
export const About: FC<AboutProps> = async (properties) => {
  const [{ url: personalPortrait }, resume] = await Promise.all([
    getPersonalPortrait(),
    getResume(),
  ]);

  return (
    <Flex asChild align={{ sm: "start" }} direction="column" {...properties}>
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
          <a href={resume} rel="noopener noreferrer" target="_blank">
            Download Resume
          </a>
        </Button>
      </Section>
    </Flex>
  );
};
