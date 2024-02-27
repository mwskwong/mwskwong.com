export default {
  cache: false,
  ci: {
    buildStatic: true,
    budget: {
      // minus point from
      //   1. TBT due to MUI
      //   2. LCP due to images
      performance: 70,
      // minus point from
      //   1. Code block doesn't have enough color contrast
      //   2. Links rely on color to be distinguishable
      accessibility: 91,
      // minus point from hydration errors are sometimes logged due to PPR
      'best-practices': 96,
      // minus point from non-PROD not being indexable
      seo: 92,
    },
  },
};
