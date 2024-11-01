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
      performance: 95,
      /**
       * Minus point from
       *   1. Code block doesn't have enough color contrast
       *   2. Links rey on color to be distinguishable (can set underline=always to fix it)
       */
      accessibility: 92,
      'best-practices': 100,
      /**
       * Minus point from
       *   1. Non-PROD not being indexable
       */
      seo: 69,
    },
  },
  scanner: {
    samples: 5,
  },
};
