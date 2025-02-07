const config = {
  cache: false,
  ci: {
    buildStatic: true,
    budget: {
      performance: 90,
      accessibility: 92, // minus point from links relying on colors to be distinguishable in /blog/:slug; info callout doesn't have enough contrast
      "best-practices": 100,
      seo: 63, // minus point from non-PROD not being indexable
    },
  },
  scanner: {
    samples: 3,
    crawler: false,
  },
  lighthouseOptions: {
    throttling: {
      cpuSlowdownMultiplier: 8.7,
    },
  },
  puppeteerClusterOptions: {
    maxConcurrency: 1,
  },
};

export default config;
