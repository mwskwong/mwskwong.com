export default {
  cache: false,
  ci: {
    buildStatic: true,
    budget: {
      // minus point from
      //   1. Code block doesn't have enough color contrast
      accessibility: 98,
      // minus point from hydration errors are sometimes logged due to PPR
      'best-practices': 92,
      // minus point from non-PROD not being indexable
      seo: 92,
    },
  },
};
