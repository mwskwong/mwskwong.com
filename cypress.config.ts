import { defineConfig } from 'cypress';

import { setupContentfulClient } from './cypress/support/clients';
import { Ctx } from './cypress/support/e2e';
import {
  getCv,
  getPlatformProfiles,
  getSkillSet,
} from './cypress/support/queries';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    experimentalWebKitSupport: true,
    setupNodeEvents: async (_, config) => {
      setupContentfulClient({
        space: config.env.CONTENTFUL_SPACE_ID as string,
        accessToken: config.env.CONTENTFUL_ACCESS_TOKEN as string,
        environment:
          config.env.ENVIRONMENT === 'Production' ? 'master' : 'develop',
      });

      config.env.ctx = {
        cv: await getCv(),
        skillSet: await getSkillSet(),
        platformProfiles: await getPlatformProfiles(),
      } satisfies Ctx;

      return config;
    },
  },
});
