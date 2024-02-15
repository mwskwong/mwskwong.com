import { pick } from 'lodash-es';

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
  describe('Platform profile links', () => {
    const allLinks = {
      GitHub: github,
      LinkedIn: linkedin,
      'Stack Overflow': stackOverflow,
      RSS: rss,
    };

    const containers = [
      {
        component: 'header',
        visibleLinks: pick(allLinks, ['GitHub', 'LinkedIn']),
      },
      {
        component: 'footer',
        visibleLinks: allLinks,
      },
    ];

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses}
     */
    const successfulAndRedirectionStatusCodes = [
      200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304,
      305, 306, 307, 308,
    ];

    beforeEach(() => cy.visit(home.pathname));

    for (const { component, visibleLinks } of containers) {
      describe(component, () => {
        for (const [iconTitle, url] of Object.entries(visibleLinks)) {
          describe(`${iconTitle} link`, () => {
            it(`opens ${url} in a new tab`, () => {
              cy.get(component)
                .find('svg')
                .contains('title', iconTitle)
                .parents('a')
                .as('link');

              cy.get('@link').should('have.attr', 'href', url);
              cy.get('@link').should('have.attr', 'target', '_blank');

              cy.request({ url, failOnStatusCode: false }).then(
                ({ status }) => {
                  const validStatusCodes = [
                    ...successfulAndRedirectionStatusCodes,
                  ];

                  // LinkedIn's specially HTTP status code
                  // It returns for any "unauthorized" access to prevent random sites from linking to it
                  if (url.includes('linkedin')) {
                    validStatusCodes.push(999);
                  }

                  expect(status).to.be.oneOf(validStatusCodes);
                },
              );
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
