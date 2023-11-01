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
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import {
  BrainCircuit,
  Bug,
  Database,
  Infinity,
  LayoutDashboard,
  MessagesSquare,
  MonitorDot,
  TabletSmartphone,
  Terminal,
} from 'lucide-react';
import { LiteralUnion } from 'type-fest';

import * as contentfulIds from '@/constants/contentful-ids';

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
  [contentfulIds.devOps]: Infinity,
  [contentfulIds.frontend]: LayoutDashboard,
  [contentfulIds.machineLearning]: BrainCircuit,
  [contentfulIds.mobile]: TabletSmartphone,
  [contentfulIds.qa]: Bug,
  [contentfulIds.softSkills]: MessagesSquare,
};

export const getIconByContentfulId = (
  id: LiteralUnion<keyof typeof Icons, string>,
) => (id in Icons ? Icons[id as keyof typeof Icons] : undefined);
