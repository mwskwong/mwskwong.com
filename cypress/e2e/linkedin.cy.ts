import { home } from '../fixtures/nav';
import { linkedin } from '../fixtures/platform-profiles';

describe('LinkedIn', () => {
  it('should links to my LinkedIn profile', () => {
    cy.visit(home.pathname);
    cy.contains('LinkedIn')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', linkedin);
  });
});
