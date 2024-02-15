export default {
  cache: false,
  ci: {
    reporter: 'jsonExpanded',
    budget: {
      performance: 90,
      accessibility: 98, // minus point from code blocks some times have color contrast issue
      'best-practices': 92, // minus point from hydration errors are some times logged
      seo: 92, // minus point from non-PROD not being indexable
    },
  },
};
