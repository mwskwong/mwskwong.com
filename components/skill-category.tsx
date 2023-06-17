import { IconType } from "@icons-pack/react-simple-icons/types";
import {
  Chip,
  Sheet,
  Stack,
  StackProps,
  SvgIcon,
  SvgIconProps,
  Typography,
} from "@mui/joy";
import { mergeSx } from "merge-sx";
import { FC } from "react";

type Props = StackProps & {
  name?: string;
  skills?: string[];
  slots?: Partial<{
    icon: typeof SvgIcon | FC<SvgIconProps> | IconType;
  }>;
};

const SKillCategory: FC<Props> = ({
  name,
  skills = [],
  sx,
  slots = {},
  ...props
}) => {
  const { icon: Icon, ...restSlots } = slots;
  return (
    <Stack
      spacing={2}
      sx={mergeSx({ alignItems: "center" }, sx)}
      slots={restSlots}
      {...props}
    >
      <Sheet
        variant="outlined"
        sx={{ display: "flex", borderRadius: "sm", p: 1.5 }}
      >
        {Icon && <Icon fontSize="xl4" />}
      </Sheet>
      <Typography level="h6" component="h4" color="primary">
        {name}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "center", flexWrap: "wrap" }}
      >
        {skills.map((skill) => (
          <Chip key={skill} color="neutral" variant="outlined">
            {skill}
          </Chip>
        ))}
      </Stack>
    </Stack>
  );
};

export default SKillCategory;
