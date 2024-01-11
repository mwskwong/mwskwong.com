import {
  IconType,
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
import { clsx } from 'clsx';
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
import { ComponentProps, SVGProps, forwardRef } from 'react';
import { LiteralUnion } from 'type-fest';

import * as contentfulIds from '@/constants/contentful-ids';
import ContentfulLight from '@/logos/contentful-light.svg';
import EmailJs from '@/logos/emailjs.svg';
import ImprovMx from '@/logos/improvmx.svg';
import Mui from '@/logos/mui.svg';
import NextJsLight from '@/logos/nextjs-light.svg';
import PlanetScaleLight from '@/logos/planetscale-light.svg';
import PrismaDark from '@/logos/prisma-dark.svg';
import PrismaLight from '@/logos/prisma-light.svg';
import ReactHookForm from '@/logos/react-hook-form.svg';
import ReactLight from '@/logos/react-light.svg';
import TypeScript from '@/logos/typescript.svg';
import Valibot from '@/logos/valibot.svg';
import VercelDark from '@/logos/vercel-dark.svg';
import VercelLight from '@/logos/vercel-light.svg';

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
};

export type IconProps = ComponentProps<IconType> &
  LucideProps & {
    contentfulId: LiteralUnion<keyof typeof Icons, string>;
  };

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ contentfulId, ...props }, ref) => {
    if (!(contentfulId in Icons)) return null;

    const Icon = Icons[contentfulId as keyof typeof Icons];
    return <Icon ref={ref} {...props} />;
  },
);

Icon.displayName = 'Icon';

const Logos = {
  [contentfulIds.muiCore]: { light: Mui, dark: Mui },
  [contentfulIds.joyUi]: { light: Mui, dark: Mui },
  [contentfulIds.nextJs]: { light: NextJsLight, dark: undefined },
  [contentfulIds.prisma]: { light: PrismaLight, dark: undefined },
  [contentfulIds.react]: { light: ReactLight, dark: undefined },
  [contentfulIds.reactHookForm]: { light: ReactHookForm, dark: ReactHookForm },
  [contentfulIds.typescript]: { light: TypeScript, dark: TypeScript },
  [contentfulIds.valibot]: { light: Valibot, dark: Valibot },
  [contentfulIds.contentful]: { light: ContentfulLight, dark: undefined },
  [contentfulIds.emailjs]: { light: EmailJs, dark: EmailJs },
  [contentfulIds.improvMx]: { light: ImprovMx, dark: ImprovMx },
  [contentfulIds.planetScale]: { light: PlanetScaleLight, dark: undefined },
  [contentfulIds.vercel]: { light: VercelLight, dark: VercelDark },
  [contentfulIds.vercelStyleGuide]: { light: VercelLight, dark: VercelDark },
  [contentfulIds.prismaReadReplicasExtension]: {
    light: PrismaLight,
    dark: PrismaDark,
  },
};

export interface LogoProps extends SVGProps<SVGSVGElement> {
  contentfulId: LiteralUnion<keyof typeof Logos, string>;
  colorScheme?: 'light' | 'dark';
}

export const logoClasses = {
  colorSchemeLight: 'ContentfulLogo-colorSchemeLight',
  colorSchemeDark: 'ContentfulLogo-colorSchemeDark',
};

export const Logo = forwardRef<SVGSVGElement, LogoProps>(
  ({ contentfulId, colorScheme = 'dark', className, ...props }, ref) => {
    if (!(contentfulId in Logos)) return null;

    const Logo = Logos[contentfulId as keyof typeof Logos][colorScheme];
    return (
      Logo && (
        <Logo
          className={clsx(
            {
              [logoClasses.colorSchemeLight]: colorScheme === 'light',
              [logoClasses.colorSchemeDark]: colorScheme === 'dark',
            },
            className,
          )}
          ref={ref}
          {...props}
        />
      )
    );
  },
);

Logo.displayName = 'Logo';
