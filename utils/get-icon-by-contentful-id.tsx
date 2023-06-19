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
import contentfulIds from "@/constants/contentful-ids";
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
  [contentfulIds.datacamp]: createSimpleIcon(SiDatacamp as IconType),
  [contentfulIds.enterprisedb]: createSimpleIcon(SiEnterprisedb as IconType),
  [contentfulIds.github]: createSimpleIcon(SiGithub as IconType),
  [contentfulIds.google]: createSimpleIcon(SiGoogle as IconType),
  [contentfulIds.linkedin]: createSimpleIcon(SiLinkedin as IconType),
  [contentfulIds.microsoft]: createSimpleIcon(SiMicrosoft as IconType),
  [contentfulIds.mongodb]: createSimpleIcon(SiMongodb as IconType),
  [contentfulIds.oracle]: createSimpleIcon(SiOracle as IconType),
  [contentfulIds.stackoverflow]: createSimpleIcon(SiStackoverflow as IconType),
  [contentfulIds.udemy]: createSimpleIcon(SiUdemy as IconType),
  [contentfulIds.backend]: TerminalRounded,
  [contentfulIds.cloud]: CloudRounded,
  [contentfulIds.database]: Database,
  [contentfulIds.dataOps]: AllInclusiveRounded,
  [contentfulIds.frontend]: DashboardRounded,
  [contentfulIds.machineLearning]: MachineLearning,
  [contentfulIds.mobile]: DevicesOtherRounded,
  [contentfulIds.qa]: BugReportRounded,
};

const getIconByContentfulId = (id: string) => {
  if (Object.hasOwn(Icons, id)) {
    return Icons[id as keyof typeof Icons];
  }
};

export default getIconByContentfulId;
