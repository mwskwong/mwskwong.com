/**
 * FIXME: this is meant for a workaround to access design tokens on the server,
 * without using 'use client' declarative, since at this stage MUI is using Emotion
 * and all MUI related API can only be used in client component
 * @see {@link https://mui.com/joy-ui/customization/default-theme-viewer/}
 */

export const breakpoints = {
  values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
} as const;
