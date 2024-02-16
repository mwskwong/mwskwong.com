export default {
  cache: false,
  ci: {
    buildStatic: true,
    budget: {
      performance: 90,
      accessibility: 98, // minus point from code blocks sometimes have color contrast issue
      'best-practices': 92, // minus point from hydration errors are sometimes logged due to PPR
      seo: 92, // minus point from non-PROD not being indexable
    },
  },
  lighthouseOptions: {
    throttlingMethod: 'devtools',
  },
};
