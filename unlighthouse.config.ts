export default {
  cache: false,
  ci: {
    buildStatic: true,
    budget: {
      /**
       * Minus point from
       *   1. TBT due to MUI
       *   2. LCP due to images, e.g. profile pic and blog cover photo
       */
      // performance: 80,
      /**
       * Minus point from
       *   1. Code block doesn't have enough color contrast
       */
      accessibility: 98,
      /**
       * Minus point from
       *   1. Hydration mismatch errors are sometimes logged due to PPR
       */
      'best-practices': 92,
      /**
       * Minus point from
       *   1. Non-PROD not being indexable
       */
      seo: 92,
    },
  },
};
