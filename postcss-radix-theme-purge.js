module.exports = (options = { selectors: [], fontFamilies: [] }) => {
  return {
    postcssPlugin: 'postcss-radix-theme-purge',
    Rule: (rule) => {
      const shouldRemove = options.selectors.some((selector) =>
        rule.selector.includes(selector),
      );

      if (shouldRemove) {
        rule.remove();
      }
    },
    AtRule: {
      fontFace: (atRule) => {
        const fontFamilyNode = atRule.nodes.find(
          (node) => node.prop === 'font-family',
        );

        if (fontFamilyNode) {
          const fontFamily = fontFamilyNode.value.replace(/['"]/g, '');
          const shouldRemove = options.fontFamilies.some((family) =>
            fontFamily.includes(family),
          );

          if (shouldRemove) {
            atRule.remove();
          }
        }
      },
    },
  };
};

module.exports.postcss = true;
