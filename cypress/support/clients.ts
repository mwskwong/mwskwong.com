import { createClient } from 'contentful';

export const contentful = createClient({
  space: Cypress.env('CONTENTFUL_SPACE_ID') as string,
  accessToken: Cypress.env('CONTENTFUL_ACCESS_TOKEN') as string,
  environment:
    Cypress.env('ENVIRONMENT') === 'Production' ? 'master' : 'develop',
}).withoutUnresolvableLinks;
