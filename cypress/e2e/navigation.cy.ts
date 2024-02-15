import { blog, home, nav, privacyPolicy } from '../fixtures/nav';
import {
  github,
  linkedin,
  rss,
  stackOverflow,
} from '../fixtures/platform-profiles';
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

    for (const [key, viewport] of Object.entries({ xs, md })) {
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
  describe.only('Platform profile links', () => {
    const allLinks = {
      GitHub: github,
      LinkedIn: linkedin,
      'Stack Overflow': stackOverflow,
      RSS: rss,
    };

    const containers = [
      {
        component: 'header',
        visibleLinks: { GitHub: github, LinkedIn: linkedin },
      },
      {
        component: 'footer',
        visibleLinks: allLinks,
      },
    ];

    beforeEach(() => cy.visit(home.pathname));

    for (const { component, visibleLinks } of containers) {
      describe(component, () => {
        for (const [iconTitle, url] of Object.entries(visibleLinks)) {
          describe(`${iconTitle} link`, () => {
            beforeEach(() => {
              // suppress all errors thrown by stackoverflow.com
              cy.origin('https://stackoverflow.com', () => {
                cy.on('uncaught:exception', () => false);
              });
            });

            it(`opens ${url} in a new tab`, () => {
              cy.get(component)
                .find('svg')
                .contains('title', iconTitle)
                .parents('a')
                .should('have.attr', 'target', '_blank')
                .invoke('attr', 'target', '_self')
                .click({ force: true });

              if (url.startsWith('https')) {
                cy.origin(url, { args: { url } }, ({ url }) => {
                  cy.url().should('equal', url);
                });
              } else {
                cy.location('pathname').should('equal', url);
              }
            });
          });
        }

        const visibleIconTitles = Object.keys(visibleLinks);
        const notExistIconTitles = Object.keys(allLinks).filter(
          (iconTitle) => !visibleIconTitles.includes(iconTitle),
        );

        for (const iconTitle of notExistIconTitles) {
          describe(`${iconTitle} link`, () => {
            it(`should not exist`, () => {
              cy.get(component)
                .find('svg')
                .contains('title', iconTitle)
                .should('not.exist');
            });
          });
        }
      });
    }
  });
});
