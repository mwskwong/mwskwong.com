import {
  type IconType,
  SiGithub,
  SiLinkedin,
  SiStackoverflow,
} from '@icons-pack/react-simple-icons';
import {
  Activity,
  BrainCircuit,
  Bug,
  Database,
  LayoutDashboard,
  type LucideProps,
  MonitorDot,
  Shapes,
  TabletSmartphone,
  Terminal,
  Workflow,
} from 'lucide-react';
import { type ComponentProps, type FC } from 'react';
import { type LiteralUnion } from 'type-fest';

import * as contentfulIds from '@/constants/contentful-ids';

const generateSimpleIcon = (SiIcon: IconType) => {
  const Icon: FC<ComponentProps<IconType>> = (props) => (
    <SiIcon viewBox="-2 -2 28 28" {...props} />
  );
  Icon.displayName = SiIcon.displayName;
  return Icon;
};

const Icons = {
  [contentfulIds.github]: generateSimpleIcon(SiGithub),
  [contentfulIds.linkedin]: generateSimpleIcon(SiLinkedin),
  [contentfulIds.stackOverflow]: generateSimpleIcon(SiStackoverflow),
  [contentfulIds.backend]: Terminal,
  [contentfulIds.cms]: MonitorDot,
  [contentfulIds.database]: Database,
  [contentfulIds.devOps]: Workflow,
  [contentfulIds.frontend]: LayoutDashboard,
  [contentfulIds.machineLearning]: BrainCircuit,
  [contentfulIds.mobile]: TabletSmartphone,
  [contentfulIds.qa]: Bug,
  [contentfulIds.monitoring]: Activity,
  [contentfulIds.toolsAndPlatforms]: Shapes,
};

export type IconProps = ComponentProps<IconType> &
  LucideProps & {
    contentfulId: LiteralUnion<keyof typeof Icons, string>;
  };

export const Icon: FC<IconProps> = ({ contentfulId, ...props }) => {
  if (!(contentfulId in Icons)) return null;

  const Icon = Icons[contentfulId as keyof typeof Icons];
  return <Icon {...props} />;
};
