"use client";

import Box from "@mui/joy/Box";
import { useTheme } from "@mui/joy/styles";
import { Highlight, PrismTheme } from "prism-react-renderer";
import {
  ComponentProps,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  ReactElement,
} from "react";

const usePrismTheme = (): PrismTheme => {
  const theme = useTheme();
  return {
    plain: {
      color: theme.vars.palette.text.secondary,
      backgroundColor: theme.vars.palette.background.level1,
    },
    styles: [
      {
        types: ["prolog"],
        style: { color: "rgb(0, 0, 128)" },
      },
      {
        types: ["comment"],
        style: {
          color: "rgb(106, 153, 85)",
        },
      },
      {
        types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
        style: {
          color: theme.vars.palette.primary[300],
        },
      },
      {
        types: ["number", "inserted"],
        style: {
          color: theme.vars.palette.success[200],
        },
      },
      {
        types: ["constant"],
        style: {
          color: "rgb(100, 102, 149)",
        },
      },
      {
        types: ["attr-name", "variable"],
        style: {
          color: "rgb(156, 220, 254)",
        },
      },
      {
        types: ["deleted", "string", "attr-value", "template-punctuation"],
        style: {
          color: theme.vars.palette.warning[400],
        },
      },
      {
        types: ["selector"],
        style: {
          color: "rgb(215, 186, 125)",
        },
      },
      {
        types: ["tag"],
        style: {
          color: "rgb(78, 201, 176)",
        },
      },
      {
        types: ["tag"],
        languages: ["markup"],
        style: {
          color: "rgb(86, 156, 214)",
        },
      },
      {
        types: ["punctuation", "operator"],
        style: {
          color: "rgb(212, 212, 212)",
        },
      },
      {
        types: ["punctuation"],
        languages: ["markup"],
        style: {
          color: "#808080",
        },
      },
      {
        types: ["function"],
        style: {
          color: theme.vars.palette.warning[200],
        },
      },
      {
        types: ["class-name"],
        style: {
          color: theme.vars.palette.success[400],
        },
      },
      {
        types: ["char"],
        style: {
          color: "rgb(209, 105, 105)",
        },
      },
    ],
  };
};

const CodeBlock: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = ({ ref, children, ...props }) => {
  const internalCodeElemProps = (
    children as ReactElement<ComponentProps<"code">>
  ).props;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const language = internalCodeElemProps.className!.split("language-")[1];
  const prismTheme = usePrismTheme();

  return (
    <Highlight
      code={internalCodeElemProps.children as string}
      theme={prismTheme}
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
