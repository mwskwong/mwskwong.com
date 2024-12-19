const config = {
  cache: false,
  ci: {
    buildStatic: true,
    budget: {
      performance: 95,
      accessibility: 100,
      'best-practices': 100,
      /**
       * Minus point from
       *   1. Non-PROD not being indexable
       */
      seo: 63,
    },
  },
  scanner: {
    samples: 5,
  },
};

export default config;
