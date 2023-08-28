"use client";

import Box from "@mui/joy/Box";
import { Highlight } from "prism-react-renderer";
import {
  ComponentProps,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  ReactElement,
} from "react";

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
          whiteSpace="nowrap"
          overflow="auto"
          borderRadius="md"
          border={1}
          borderColor="neutral.outlinedBorder"
          p={2}
          my={2}
          style={style}
          {...props}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </Box>
      )}
    </Highlight>
  );
};

export default CodeBlock;
