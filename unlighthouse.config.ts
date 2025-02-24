const config = {
  site: process.env.DEPLOYMENT_URL,
  urls: async () => {
    const response = await fetch(
      `${process.env.DEPLOYMENT_URL ?? ""}/sitemap.xml`,
    );
    const sitemap = await response.text();
    return sitemap
      .match(/<loc>(.*?)<\/loc>/g)
      ?.map((loc) => loc.replaceAll(/<\/?loc>/g, ""));
  },
  cache: false,
  ci: {
    reporter: "jsonExpanded",
    buildStatic: true,
    budget: {
      performance: 80,
      accessibility: 92, // minus point from links relying on colors to be distinguishable in /blog/:slug; info callout doesn't have enough contrast
      "best-practices": 100,
      seo: 60, // minus point from non-PROD not being indexable
    },
  },
  extraHeaders: {
    "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
  },
  scanner: {
    samples: 3,
  },
  lighthouseOptions: {
    throttling: {
      cpuSlowdownMultiplier: 8.6, // matches GitHub Action Ubuntu performance
    },
  },
  puppeteerClusterOptions: {
    maxConcurrency: 1,
  },
};

export default config;
