import {
  SiDatacamp,
  SiEnterprisedb,
  SiGithub,
  SiGoogle,
  SiLinkedin,
  SiMicrosoft,
  SiMongodb,
  SiOracle,
  SiStackoverflow,
  SiUdemy,
} from "@icons-pack/react-simple-icons";
import { IconType } from "@icons-pack/react-simple-icons/types";
import {
  AllInclusiveRounded,
  BugReportRounded,
  CloudRounded,
  DashboardRounded,
  DevicesOtherRounded,
  TerminalRounded,
} from "@mui/icons-material";
import clsx from "clsx";
import { forwardRef } from "react";

import Database from "@/components/icons/database";
import MachineLearning from "@/components/icons/machine-learning";
import { simpleIconsClasses } from "@/theme";

const createSimpleIcon = (Icon: IconType) => {
  const SimpleIcon: IconType = forwardRef(({ className, ...props }, ref) => (
    <Icon
      ref={ref}
      className={clsx(simpleIconsClasses.root, className)}
      {...props}
    />
  ));
  SimpleIcon.displayName = Icon.displayName;

  return SimpleIcon;
};

const Icons = {
  "39xxsgQxQ8QkkLanehShwM": createSimpleIcon(SiDatacamp as IconType),
  "2H5GgFU9w93zAuYJC9Ei77": createSimpleIcon(SiEnterprisedb as IconType),
  "5okHEYjphz0Ijf8buAc53L": createSimpleIcon(SiGithub as IconType),
  "7g52E2sWK3NrJrkHpo0FgM": createSimpleIcon(SiGoogle as IconType),
  "1pixZwU07yhCdpEdkxGVof": createSimpleIcon(SiLinkedin as IconType),
  "3evl5GGoKX4ReIAqDHJOU5": createSimpleIcon(SiMicrosoft as IconType),
  "31rWywCQiI78yNjvDJBhgT": createSimpleIcon(SiMongodb as IconType),
  "7zGOgiIofeUxiotCfqQlxr": createSimpleIcon(SiOracle as IconType),
  "1VVUJjfmnMSqIYZcpbQVLI": createSimpleIcon(SiStackoverflow as IconType),
  "1HehJlTFU3uyHsvibs0jGk": createSimpleIcon(SiUdemy as IconType),
  "2FtEFXEYpFad3n0eE4CNyF": TerminalRounded,
  BZg9YwYqAGvFoarrIqk4M: CloudRounded,
  "1lgdoqAo3anMd8oMWkvou2": Database,
  "9zrJS3ggkoVadUxZTvwyc": AllInclusiveRounded,
  "3sdnCkE0j79D4kRSGuUjhp": DashboardRounded,
  "4nOEnXVl1fCJGetHGVnsZ8": MachineLearning,
  "3biweEjbkRyZaII8ZgkQhI": DevicesOtherRounded,
  "119H1LBXMmT8xLTdnAq1PS": BugReportRounded,
};

const getIconByContentfulId = (id: string) => {
  if (Object.hasOwn(Icons, id)) {
    return Icons[id as keyof typeof Icons];
  }
};

export default getIconByContentfulId;
