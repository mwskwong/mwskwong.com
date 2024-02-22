// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import { getCv, getPlatformProfiles, getSkillSet } from './queries';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err) => {
  // FIXME: This error is some times thrown when testing in webkit browser for unknown reasons
  if (err.name === 'ValiError') {
    return false;
  }
});

export interface Ctx {
  cv: Awaited<ReturnType<typeof getCv>>;
  skillSet: Awaited<ReturnType<typeof getSkillSet>>;
  platformProfiles: Awaited<ReturnType<typeof getPlatformProfiles>>;
}
