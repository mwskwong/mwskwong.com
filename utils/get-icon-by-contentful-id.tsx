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

export const DATACAMP = "39xxsgQxQ8QkkLanehShwM";
export const ENTERPRISE_DB = "2H5GgFU9w93zAuYJC9Ei77";
export const GITHUB = "5okHEYjphz0Ijf8buAc53L";
export const GOOGLE = "7g52E2sWK3NrJrkHpo0FgM";
export const LINKEDIN = "1pixZwU07yhCdpEdkxGVof";
export const MICROSOFT = "3evl5GGoKX4ReIAqDHJOU5";
export const MONGODB = "31rWywCQiI78yNjvDJBhgT";
export const ORACLE = "7zGOgiIofeUxiotCfqQlxr";
export const STACK_OVERFLOW = "1VVUJjfmnMSqIYZcpbQVLI";
export const UDEMY = "1HehJlTFU3uyHsvibs0jGk";
export const BACKEND = "2FtEFXEYpFad3n0eE4CNyF";
export const CLOUD = "BZg9YwYqAGvFoarrIqk4M";
export const DATABASE = "1lgdoqAo3anMd8oMWkvou2";
export const DATA_OPS = "9zrJS3ggkoVadUxZTvwyc";
export const FRONTEND = "3sdnCkE0j79D4kRSGuUjhp";
export const MACHINE_LEARNING = "4nOEnXVl1fCJGetHGVnsZ8";
export const MOBILE = "3biweEjbkRyZaII8ZgkQhI";
export const QA = "119H1LBXMmT8xLTdnAq1PS";

const Icons = {
  [DATACAMP]: createSimpleIcon(SiDatacamp as IconType),
  [ENTERPRISE_DB]: createSimpleIcon(SiEnterprisedb as IconType),
  [GITHUB]: createSimpleIcon(SiGithub as IconType),
  [GOOGLE]: createSimpleIcon(SiGoogle as IconType),
  [LINKEDIN]: createSimpleIcon(SiLinkedin as IconType),
  [MICROSOFT]: createSimpleIcon(SiMicrosoft as IconType),
  [MONGODB]: createSimpleIcon(SiMongodb as IconType),
  [ORACLE]: createSimpleIcon(SiOracle as IconType),
  [STACK_OVERFLOW]: createSimpleIcon(SiStackoverflow as IconType),
  [UDEMY]: createSimpleIcon(SiUdemy as IconType),
  [BACKEND]: TerminalRounded,
  [CLOUD]: CloudRounded,
  [DATABASE]: Database,
  [DATA_OPS]: AllInclusiveRounded,
  [FRONTEND]: DashboardRounded,
  [MACHINE_LEARNING]: MachineLearning,
  [MOBILE]: DevicesOtherRounded,
  [QA]: BugReportRounded,
};

const getIconByContentfulId = (id: string) => {
  if (Object.hasOwn(Icons, id)) {
    return Icons[id as keyof typeof Icons];
  }
};

export default getIconByContentfulId;
