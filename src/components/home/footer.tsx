import { legalName, techFocus } from "@/constants/me";
import { Box, Section, type SectionProps, Text } from "@radix-ui/themes";
import { type FC } from "react";

export type FooterProps = Omit<SectionProps, "asChild" | "children">;

export const Footer: FC<FooterProps> = (properties) => (
  <Section asChild {...properties}>
    <footer>
      <Box asChild maxWidth="50ch">
        <Text as="p" color="gray" size="2">
          {techFocus}
        </Text>
      </Box>
      <Text as="p" color="gray" mt="2" size="1">
        Copyright © {new Date().getFullYear()} {legalName}
      </Text>
    </footer>
  </Section>
);
