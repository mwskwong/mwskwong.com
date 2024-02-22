import pick from 'lodash/pick';

import { github, linkedin, stackOverflow } from '../fixtures/contentful-ids';
import { blog, blogRssFeed, home, nav, privacyPolicy } from '../fixtures/nav';
import { md, xs } from '../fixtures/viewports';
import { Ctx } from '../support/e2e';

describe('Site navigation', () => {
  const { platformProfiles } = Cypress.env('ctx') as Ctx;

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

  describe.only('Platform profile links', () => {
    const allLinks = {
      GitHub: platformProfiles.find(({ platform }) => platform?.id === github)
        ?.url,
      LinkedIn: platformProfiles.find(
        ({ platform }) => platform?.id === linkedin,
      )?.url,
      'Stack Overflow': platformProfiles.find(
        ({ platform }) => platform?.id === stackOverflow,
      )?.url,
      RSS: blogRssFeed.pathname,
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

    beforeEach(() => cy.visit(home.pathname));

    for (const { component, visibleLinks } of containers) {
      describe(component, () => {
        for (const [iconTitle, url = ''] of Object.entries(visibleLinks)) {
          describe(`${iconTitle} link`, () => {
            it(`opens ${url} in a new tab`, () => {
              cy.get(component)
                .find('svg')
                .contains('title', iconTitle)
                .parents('a')
                .should('have.attr', 'href', url)
                .shouldOpenLinkInNewTab();
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
