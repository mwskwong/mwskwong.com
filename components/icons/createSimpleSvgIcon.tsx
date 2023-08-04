import { SvgIcon, SvgIconProps } from "@mui/joy";
import mergeSx from "merge-sx";
import { FC } from "react";
import { SimpleIcon } from "simple-icons";

const createSimpleSvgIcon = (simpleIcon: SimpleIcon, displayName: string) => {
  const SimpleSvgIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
    <SvgIcon
      sx={mergeSx(
        {
          p: "var(--MaterialIcon-padding)",
          color: props.color === "branding" ? `#${simpleIcon.hex}` : undefined,
        },
        sx,
      )}
      {...props}
    >
      <path d={simpleIcon.path} />
    </SvgIcon>
  );

  SimpleSvgIcon.displayName = displayName;

  return SimpleSvgIcon;
};

export default createSimpleSvgIcon;
