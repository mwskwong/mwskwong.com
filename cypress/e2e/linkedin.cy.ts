import { linkedin } from '../fixtures/contentful-ids';
import { home } from '../fixtures/nav';
import { Ctx } from '../support/e2e';

describe('LinkedIn', () => {
  const { platformProfiles } = Cypress.env('ctx') as Ctx;
  const url = platformProfiles.find(
    ({ platform }) => platform?.id === linkedin,
  )?.url;

  it('should links to my LinkedIn profile', () => {
    cy.visit(home.pathname);
    cy.contains('LinkedIn')
      .should('have.attr', 'href', url)
      .shouldOpenLinkInNewTab();
  });
});
