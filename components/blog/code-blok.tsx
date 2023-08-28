"use client";

import Box from "@mui/joy/Box";
import { Highlight, Prism } from "prism-react-renderer";
import {
  ComponentProps,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  ReactElement,
} from "react";

(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-json");

const CodeBlock: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = ({ ref, children, ...props }) => {
  const internalCodeElemProps = (
    children as ReactElement<ComponentProps<"code">>
  ).props;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const language = internalCodeElemProps.className!.split("language-")[1];

  return (
    <Highlight
      code={internalCodeElemProps.children as string}
      language={language}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <Box
          data-joy-color-scheme="dark"
          component="pre"
          fontFamily="code"
          fontSize="sm"
          overflow="auto"
          borderRadius="md"
          border={1}
          borderColor="neutral.outlinedBorder"
          p={2}
          my={2}
          style={style}
          {...props}
        >
          {tokens.map((line, index) => {
            const lastEmptyLine =
              index === tokens.length - 1 && line.every(({ empty }) => empty);
            if (lastEmptyLine) return null;
            return (
              <Box
                key={index}
                component="div"
                width="fit-content"
                {...getLineProps({ line })}
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </Box>
            );
          })}
        </Box>
      )}
    </Highlight>
  );
};

export default CodeBlock;
