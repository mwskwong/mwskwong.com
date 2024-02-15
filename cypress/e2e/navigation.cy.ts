import { blog, home, nav, privacyPolicy } from '../fixtures/nav';
import { md, xs } from '../fixtures/viewports';

describe('Site navigation', () => {
  it('navigates to home page on logo click', () => {
    cy.visit(blog.pathname);
    cy.get('[data-cy="logo"]').click();
    cy.location('pathname').should('equal', home.pathname);
  });

  describe('Main navigation', () => {
    beforeEach(() => cy.visit(home.pathname));

    it('shows in drawer ONLY in mdDown', xs, () => {
      cy.get('[data-cy="nav-list-xs"]').should('not.be.visible');
      cy.get('[data-cy="menu-button"]').click();
      cy.get('[data-cy="nav-list-xs"]').should('be.visible');
    });

    it('shows next to logo ONLY in mdUp', md, () => {
      cy.get('[data-cy="nav-list-md"]').should('be.visible');
      cy.get('[data-cy="menu-button"]').should('not.be.visible');
      cy.get('[data-cy="nav-list-xs"]').should('not.be.visible');
    });

    for (const [key, viewport] of [
      ['xs', xs],
      ['md', md],
    ] as const) {
      describe(`Viewport: ${key}`, viewport, () => {
        beforeEach(() => {
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
  });

  it(`navigates to ${privacyPolicy.label} page when clicking "Privacy Policy" in footer`, () => {
    cy.visit(home.pathname);
    // FIXME: we need to use trigger() here because for some reasons,
    // click() is not triggered (but no error is thrown) if the page scrolls right before it.
    cy.get('footer').contains(privacyPolicy.label).trigger('click');
    cy.location('pathname').should('equal', privacyPolicy.pathname);
  });

  // TODO: platform profile links tests
});
