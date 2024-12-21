/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    [
      require.resolve('./postcss-radix-theme-purge'),
      {
        selectors: [
          '.dark',
          '.rt-Kbd',
          '.rt-Callout',
          '.rt-BaseCheckbox',
          '.rt-Checkbox',
          '.rt-ContextMenu',
          '.rt-DataList',
          '.rt-BaseDialog',
          '.rt-HoverCard',
          '.rt-Progress',
          '.rt-BaseRadio',
          '.rt-Radio',
          '.rt-ScrollArea',
          '.rt-SegmentedControl',
          '.rt-Select',
          '.rt-Skeleton',
          '.rt-Slider',
          '.rt-Spinner',
          '.rt-Switch',
          '.rt-Table',
          '.rt-BaseTabList',
          '.rt-Tabs',
          '.rt-TabNav',
          '.rt-TextArea',
          '.rt-TextField',
        ],
        fontFamilies: [
          'Segoe UI (Custom)',
          'Open Sans (Custom)',
          'Consolas (Custom)',
        ],
      },
    ],
  ],
};

module.exports = config;
