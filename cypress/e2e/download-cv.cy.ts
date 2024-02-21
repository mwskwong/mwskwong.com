import { Asset } from 'contentful';

import { cv } from '../fixtures/contentful-ids';
import { home } from '../fixtures/nav';
import { contentful } from '../support/clients';

describe('Download CV', () => {
  const ctx = {
    cv: undefined as Asset<'WITHOUT_UNRESOLVABLE_LINKS'> | undefined,
  };

  before(() => {
    cy.wrap(contentful.getAsset(cv)).then((asset) => {
      ctx.cv = asset;
    });
  });

  beforeEach(() => cy.visit(home.pathname));

  it('should open CV in a new tab (for browsers with PDF reader built-in)', () => {
    const href = `https:${ctx.cv?.fields.file?.url}`;

    cy.contains('Download CV')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', href);

    cy.request(href)
      .its('headers')
      .should('have.a.property', 'content-type', 'application/pdf');
  });
});
