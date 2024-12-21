/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    [
      require.resolve('./postcss-remove-selectors'),
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
      },
    ],
  ],
};

module.exports = config;
