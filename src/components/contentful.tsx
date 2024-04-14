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
  Activity,
  BrainCircuit,
  Bug,
  Database,
  LayoutDashboard,
  LucideProps,
  MonitorDot,
  Shapes,
  TabletSmartphone,
  Terminal,
  Workflow,
} from 'lucide-react';
import { ComponentProps, FC, SVGProps, forwardRef } from 'react';
import { LiteralUnion } from 'type-fest';

import * as contentfulIds from '@/constants/contentful-ids';
import ContentfulLight from '@/logos/contentful-light.svg';
import ImprovMx from '@/logos/improvmx.svg';
import Mui from '@/logos/mui.svg';
import Neon from '@/logos/neon-light.svg';
import NextJsLight from '@/logos/nextjs-light.svg';
import PrismaDark from '@/logos/prisma-dark.svg';
import PrismaLight from '@/logos/prisma-light.svg';
import ReactHookForm from '@/logos/react-hook-form.svg';
import ReactLight from '@/logos/react-light.svg';
import ResendLight from '@/logos/resend-light.svg';
import TypeScript from '@/logos/typescript.svg';
import Valibot from '@/logos/valibot.svg';
import VercelDark from '@/logos/vercel-dark.svg';
import VercelLight from '@/logos/vercel-light.svg';

const generateSimpleIcon = (SiIcon: IconType) => {
  const Icon: IconType = forwardRef((props, ref) => (
    <SiIcon ref={ref} viewBox="-2 -2 28 28" {...props} />
  ));
  Icon.displayName = SiIcon.displayName;
  return Icon;
};

const Icons = {
  [contentfulIds.dataCamp]: generateSimpleIcon(SiDatacamp),
  [contentfulIds.enterpriseDb]: generateSimpleIcon(SiEnterprisedb),
  [contentfulIds.github]: generateSimpleIcon(SiGithub),
  [contentfulIds.google]: generateSimpleIcon(SiGoogle),
  [contentfulIds.linkedin]: generateSimpleIcon(SiLinkedin),
  [contentfulIds.microsoft]: generateSimpleIcon(SiMicrosoft),
  [contentfulIds.mongodb]: generateSimpleIcon(SiMongodb),
  [contentfulIds.oracle]: generateSimpleIcon(SiOracle),
  [contentfulIds.stackOverflow]: generateSimpleIcon(SiStackoverflow),
  [contentfulIds.udemy]: generateSimpleIcon(SiUdemy),
  [contentfulIds.youtube]: generateSimpleIcon(SiYoutube),
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

const Logos = {
  [contentfulIds.muiCore]: Mui,
  [contentfulIds.joyUi]: Mui,
  [contentfulIds.nextJs]: { light: NextJsLight, dark: undefined },
  [contentfulIds.neon]: { light: Neon, dark: undefined },
  [contentfulIds.react]: { light: ReactLight, dark: undefined },
  [contentfulIds.reactHookForm]: ReactHookForm,
  [contentfulIds.typescript]: TypeScript,
  [contentfulIds.valibot]: Valibot,
  [contentfulIds.contentful]: { light: ContentfulLight, dark: undefined },
  [contentfulIds.resend]: { light: ResendLight, dark: undefined },
  [contentfulIds.improvMx]: ImprovMx,
  [contentfulIds.prisma]: { light: PrismaLight, dark: PrismaDark },
  [contentfulIds.vercel]: { light: VercelLight, dark: VercelDark },
  [contentfulIds.vercelStyleGuide]: { light: VercelLight, dark: VercelDark },
  [contentfulIds.prismaReadReplicasExtension]: {
    light: PrismaLight,
    dark: PrismaDark,
  },
};

export interface LogoProps extends SVGProps<SVGSVGElement> {
  contentfulId: LiteralUnion<keyof typeof Logos, string>;
  colorScheme?: 'light' | 'dark' | 'auto';
}

export const logoClasses = {
  colorSchemeLight: 'ContentfulLogo-colorSchemeLight',
  colorSchemeDark: 'ContentfulLogo-colorSchemeDark',
};

export const Logo: FC<LogoProps> = ({
  contentfulId,
  colorScheme = 'auto',
  className,
  ...props
}) => {
  if (!(contentfulId in Logos)) return null;

  const MaybeLogo = Logos[contentfulId as keyof typeof Logos];
  const universal = typeof MaybeLogo === 'function';

  if (colorScheme === 'auto') {
    if (universal) return <MaybeLogo {...props} />;

    const { light: LightLogo, dark: DarkLogo } = MaybeLogo;
    return (
      <>
        <LightLogo className={logoClasses.colorSchemeLight} {...props} />
        {DarkLogo ? (
          <DarkLogo className={logoClasses.colorSchemeDark} {...props} />
        ) : null}
      </>
    );
  }

  const Logo = universal ? MaybeLogo : MaybeLogo[colorScheme];
  return (
    Logo && (
      <Logo
        className={clsx(
          {
            [logoClasses.colorSchemeLight]:
              !universal && colorScheme === 'light',
            [logoClasses.colorSchemeDark]: !universal && colorScheme === 'dark',
          },
          className,
        )}
        {...props}
      />
    )
  );
};