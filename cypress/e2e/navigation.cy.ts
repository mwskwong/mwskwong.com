import { blog, home, nav, privacyPolicy } from '../fixtures/nav';
import { md, xs } from '../fixtures/viewports';

describe('Site navigation', () => {
  it('navigates to home page on logo click', () => {
    cy.visit(blog.pathname);
    cy.get('[data-cy="logo"]').click();
    cy.location('pathname').should('equal', home.pathname);
  });

  describe('Menu button', () => {
    beforeEach(() => cy.visit('/'));
    it('shows in mdDown', xs, () => {
      cy.get('[data-cy="menu-button"]').should('be.visible');
    });

    it('hides in mdUp', md, () => {
      cy.get('[data-cy="menu-button"]').should('not.be.visible');
    });
  });

  for (const [key, viewport] of [
    ['xs', xs],
    ['md', md],
  ] as const) {
    describe(`Viewport: ${key}`, viewport, () => {
      beforeEach(() => {
        cy.visit(home.pathname);
        if (key === 'xs') {
          cy.get('[data-cy="menu-button"]').click();
        }
      });

      for (const { id, label, pathname: navPathname } of nav) {
        it(`navigates to ${label} page/section`, () => {
          cy.get(`[data-cy="nav-list-${key}"]`).contains(label).click();
          cy.location().should(({ pathname, hash }) => {
            expect(pathname).to.eq(navPathname);
            expect(hash).to.eq(id ? `#${id}` : '');
          });
        });
      }
    });
  }

  it(`navigates to ${privacyPolicy.label} page`, () => {
    cy.visit(home.pathname);
    // FIXME: we need force = true here because for some reasons,
    // click event is not triggered (but no error is thrown) if the page scrolls right before it.
    cy.get('footer').contains(privacyPolicy.label).click({ force: true });
    cy.location('pathname').should('equal', privacyPolicy.pathname);
  });

  // TODO: platform profile links tests
});
