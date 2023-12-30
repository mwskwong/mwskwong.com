import {
  IconType,
  SiContentful,
  SiDatacamp,
  SiEnterprisedb,
  SiGithub,
  SiGoogle,
  SiLinkedin,
  SiMicrosoft,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiOracle,
  SiPlanetscale,
  SiPrisma,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiStackoverflow,
  SiTypescript,
  SiUdemy,
  SiVercel,
  SiYoutube,
  SiZod,
} from '@icons-pack/react-simple-icons';
import {
  BrainCircuit,
  Bug,
  Database,
  LayoutDashboard,
  LucideProps,
  MessagesSquare,
  MonitorDot,
  TabletSmartphone,
  Terminal,
  Workflow,
} from 'lucide-react';
import { ComponentProps, FC, forwardRef } from 'react';
import { LiteralUnion } from 'type-fest';

import * as contentfulIds from '@/constants/contentful-ids';

import { SiFormspree } from './icons/si-formspree';

const Icons = {
  [contentfulIds.dataCamp]: SiDatacamp,
  [contentfulIds.enterpriseDb]: SiEnterprisedb,
  [contentfulIds.github]: SiGithub,
  [contentfulIds.google]: SiGoogle,
  [contentfulIds.linkedin]: SiLinkedin,
  [contentfulIds.microsoft]: SiMicrosoft,
  [contentfulIds.mongodb]: SiMongodb,
  [contentfulIds.oracle]: SiOracle,
  [contentfulIds.stackOverflow]: SiStackoverflow,
  [contentfulIds.udemy]: SiUdemy,
  [contentfulIds.youtube]: SiYoutube,
  [contentfulIds.backend]: Terminal,
  [contentfulIds.cms]: MonitorDot,
  [contentfulIds.database]: Database,
  [contentfulIds.devOps]: Workflow,
  [contentfulIds.frontend]: LayoutDashboard,
  [contentfulIds.machineLearning]: BrainCircuit,
  [contentfulIds.mobile]: TabletSmartphone,
  [contentfulIds.qa]: Bug,
  [contentfulIds.softSkills]: MessagesSquare,
  [contentfulIds.react]: SiReact,
  [contentfulIds.nextJs]: SiNextdotjs,
  [contentfulIds.typescript]: SiTypescript,
  [contentfulIds.joyUi]: SiMui,
  [contentfulIds.reactHookForm]: SiReacthookform,
  [contentfulIds.zod]: SiZod,
  [contentfulIds.prisma]: SiPrisma,
  [contentfulIds.planetScale]: SiPlanetscale,
  [contentfulIds.vercel]: SiVercel,
  [contentfulIds.contentful]: SiContentful,
  [contentfulIds.formspree]: SiFormspree,
  [contentfulIds.tanStackQuery]: SiReactquery,
  [contentfulIds.prismaReadReplicasExtension]: SiPrisma,
  [contentfulIds.muiCore]: SiMui,
  [contentfulIds.vercelStyleGuide]: SiVercel,
};

export type ContentfulIconProps = ComponentProps<IconType> &
  LucideProps & {
    contentfulId: LiteralUnion<keyof typeof Icons, string>;
  };

export const ContentfulIcon: FC<ContentfulIconProps> = forwardRef(
  ({ contentfulId, ...props }, ref) => {
    if (!(contentfulId in Icons)) return null;

    const Icon = Icons[contentfulId as keyof typeof Icons];
    return <Icon ref={ref} {...props} />;
  },
);

ContentfulIcon.displayName = 'ContentfulIcon';
