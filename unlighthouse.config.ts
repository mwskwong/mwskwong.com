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
      performance: 90,
      /**
       * Minus point from
       *   1. Code block doesn't have enough color contrast
       *   2. Links rey on color to be distinguishable (can set underline=always to fix it)
       */
      accessibility: 91,
      'best-practices': 100,
      /**
       * Minus point from
       *   1. Non-PROD not being indexable
       */
      seo: 92,
    },
  },
  scanner: {
    samples: 5,
  },
  lighthouseOptions: {
    // mobileSlow4G
    // https://github.com/GoogleChrome/lighthouse/blob/912495d95e8d81a5ef94ba37ffbed9bc54536d1a/core/config/constants.js#L21
    throttling: {
      rttMs: 150,
      throughputKbps: 1.6 * 1024,
      cpuSlowdownMultiplier: 4,
    },
  },
};
