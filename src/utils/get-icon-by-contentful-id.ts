import {
  AllInclusiveRounded,
  BugReportRounded,
  DashboardRounded,
  DevicesOtherRounded,
  TerminalRounded,
} from '@mui/icons-material';
import { LiteralUnion } from 'type-fest';

import { Cms } from '@/components/icons/cms';
import { Database } from '@/components/icons/database';
import { DataCamp } from '@/components/icons/datacamp';
import { EnterpriseDb } from '@/components/icons/enterprisedb';
import { GitHub } from '@/components/icons/github';
import { Google } from '@/components/icons/google';
import { LinkedIn } from '@/components/icons/linkedin';
import { MachineLearning } from '@/components/icons/machine-learning';
import { Microsoft } from '@/components/icons/microsoft';
import { MongoDb } from '@/components/icons/mongodb';
import { Oracle } from '@/components/icons/oracle';
import { StackOverflow } from '@/components/icons/stackoverflow';
import { Udemy } from '@/components/icons/udemy';
import { YouTube } from '@/components/icons/youtube';
import * as contentfulIds from '@/constants/contentful-ids';

const Icons = {
  [contentfulIds.dataCamp]: DataCamp,
  [contentfulIds.enterpriseDb]: EnterpriseDb,
  [contentfulIds.github]: GitHub,
  [contentfulIds.google]: Google,
  [contentfulIds.linkedin]: LinkedIn,
  [contentfulIds.microsoft]: Microsoft,
  [contentfulIds.mongodb]: MongoDb,
  [contentfulIds.oracle]: Oracle,
  [contentfulIds.stackOverflow]: StackOverflow,
  [contentfulIds.udemy]: Udemy,
  [contentfulIds.youtube]: YouTube,
  [contentfulIds.backend]: TerminalRounded,
  [contentfulIds.cms]: Cms,
  [contentfulIds.database]: Database,
  [contentfulIds.devOps]: AllInclusiveRounded,
  [contentfulIds.frontend]: DashboardRounded,
  [contentfulIds.machineLearning]: MachineLearning,
  [contentfulIds.mobile]: DevicesOtherRounded,
  [contentfulIds.qa]: BugReportRounded,
};

export const getIconByContentfulId = (
  id: LiteralUnion<keyof typeof Icons, string>,
) => (id in Icons ? Icons[id as keyof typeof Icons] : undefined);
