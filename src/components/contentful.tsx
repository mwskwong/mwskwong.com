import {
  type IconType,
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
  type LucideProps,
  MonitorDot,
  Shapes,
  TabletSmartphone,
  Terminal,
  Workflow,
} from 'lucide-react';
import { type ComponentProps, type FC, forwardRef } from 'react';
import { type LiteralUnion } from 'type-fest';

import * as contentfulIds from '@/constants/contentful-ids';
import contentfulLight from '@/logos/contentful-light.svg?url';
import geistDark from '@/logos/geist-dark.svg?url';
import geistLight from '@/logos/geist-light.svg?url';
import improvMx from '@/logos/improvmx.svg?url';
import mui from '@/logos/mui.svg?url';
import neon from '@/logos/neon-light.svg?url';
import nextJsLight from '@/logos/nextjs-light.svg?url';
import prismaDark from '@/logos/prisma-dark.svg?url';
import prismaLight from '@/logos/prisma-light.svg?url';
import reactHookForm from '@/logos/react-hook-form.svg?url';
import reactLight from '@/logos/react-light.svg?url';
import resendLight from '@/logos/resend-light.svg?url';
import typescript from '@/logos/typescript.svg?url';
import valibot from '@/logos/valibot.svg?url';
import vercelDark from '@/logos/vercel-dark.svg?url';
import vercelLight from '@/logos/vercel-light.svg?url';
import zod from '@/logos/zod.svg?url';

import { Image, type ImageProps } from './image';

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

const logoSrc = {
  [contentfulIds.muiCore]: mui,
  [contentfulIds.joyUi]: mui,
  [contentfulIds.nextJs]: { light: nextJsLight, dark: undefined },
  [contentfulIds.neon]: { light: neon, dark: undefined },
  [contentfulIds.react]: { light: reactLight, dark: undefined },
  [contentfulIds.reactHookForm]: reactHookForm,
  [contentfulIds.typescript]: typescript,
  [contentfulIds.valibot]: valibot,
  [contentfulIds.contentful]: { light: contentfulLight, dark: undefined },
  [contentfulIds.resend]: { light: resendLight, dark: undefined },
  [contentfulIds.improvMx]: improvMx,
  [contentfulIds.prisma]: { light: prismaLight, dark: prismaDark },
  [contentfulIds.vercel]: { light: vercelLight, dark: vercelDark },
  [contentfulIds.vercelStyleGuide]: { light: vercelLight, dark: vercelDark },
  [contentfulIds.prismaReadReplicasExtension]: {
    light: prismaLight,
    dark: prismaDark,
  },
  [contentfulIds.geist]: { light: geistLight, dark: geistDark },
  [contentfulIds.zod]: zod,
};

export interface LogoProps extends Omit<ImageProps, 'src'> {
  contentfulId: LiteralUnion<keyof typeof logoSrc, string>;
  colorScheme?: 'light' | 'dark' | 'auto';
}

export const logoClasses = {
  colorSchemeLight: 'ContentfulLogo-colorSchemeLight',
  colorSchemeDark: 'ContentfulLogo-colorSchemeDark',
};

export const Logo: FC<LogoProps> = ({
  contentfulId,
  colorScheme = 'auto',
  alt,
  className,
  ...props
}) => {
  if (!(contentfulId in logoSrc)) return null;

  const src = logoSrc[contentfulId as keyof typeof logoSrc];
  return (
    <>
      {'light' in src &&
        (colorScheme === 'auto' || colorScheme === 'light') && (
          <Image
            alt={alt}
            className={logoClasses.colorSchemeLight}
            src={src.light}
            {...props}
          />
        )}
      {'dark' in src &&
      (colorScheme === 'auto' || colorScheme === 'dark') &&
      src.dark ? (
        <Image
          alt={alt}
          className={logoClasses.colorSchemeDark}
          src={src.dark}
        />
      ) : null}
      {!('light' in src) && (
        <Image
          alt={alt}
          src={src}
          className={clsx(
            {
              [logoClasses.colorSchemeLight]:
                colorScheme === 'auto' || colorScheme === 'light',
              [logoClasses.colorSchemeDark]:
                colorScheme === 'auto' || colorScheme === 'dark',
            },
            className,
          )}
          {...props}
        />
      )}
    </>
  );
};
