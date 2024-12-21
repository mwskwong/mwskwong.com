/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    [require.resolve('./postcss-remove-selectors'), { selectors: ['.dark'] }],
  ],
};

module.exports = config;
