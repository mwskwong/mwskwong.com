module.exports = (options = { selectors: [] }) => {
  return {
    postcssPlugin: 'postcss-purge-selectors',
    Rule: (rule) => {
      const shouldRemove = options.selectors.some((selector) =>
        rule.selector.includes(selector),
      );

      if (shouldRemove) {
        rule.remove();
      }
    },
  };
};

module.exports.postcss = true;
