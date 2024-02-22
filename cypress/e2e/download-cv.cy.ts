import { home } from '../fixtures/nav';
import { Ctx } from '../support/e2e';

describe('Download CV', () => {
  const { cv } = Cypress.env('ctx') as Ctx;

  beforeEach(() => cy.visit(home.pathname));

  it('should open CV in a new tab (for browsers with PDF reader built-in)', () => {
    if (cv) {
      cy.contains('Download CV')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'href', cv);

      cy.request(cv)
        .its('headers')
        .should('have.a.property', 'content-type', 'application/pdf');
    }
  });
});
