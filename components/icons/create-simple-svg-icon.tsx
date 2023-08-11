import SvgIcon, { SvgIconProps } from "@mui/joy/SvgIcon";
import mergeSx from "merge-sx";
import { FC, forwardRef, memo } from "react";
import { SimpleIcon } from "simple-icons";

const createSimpleSvgIcon = (simpleIcon: SimpleIcon, displayName: string) => {
  const SimpleSvgIcon: FC<SvgIconProps> = forwardRef(
    ({ sx, ...props }, ref) => (
      <SvgIcon
        ref={ref}
        sx={mergeSx(
          {
            p: "var(--MaterialIcon-padding)",
            color:
              props.color === "branding" ? `#${simpleIcon.hex}` : undefined,
          },
          sx,
        )}
        {...props}
      >
        <path d={simpleIcon.path} />
      </SvgIcon>
    ),
  );

  SimpleSvgIcon.displayName = displayName;
  // @ts-expect-error MUI specific checking
  SimpleSvgIcon.muiName = "SvgIcon";

  return memo(SimpleSvgIcon);
};

export default createSimpleSvgIcon;
