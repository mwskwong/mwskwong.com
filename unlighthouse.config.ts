const config = {
  cache: false,
  ci: {
    buildStatic: true,
    budget: {
      performance: 100,
      accessibility: 100,
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

export default config;
