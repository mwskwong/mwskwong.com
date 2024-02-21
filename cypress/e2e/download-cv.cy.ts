import { home } from '../fixtures/nav';
import { Cv, getCv } from '../support/queries';

interface DownloadCvCtx {
  cv?: Cv;
}

describe('Download CV', () => {
  const ctx: DownloadCvCtx = {};

  before(() => {
    cy.wrap(getCv()).then((asset) => {
      ctx.cv = asset;
    });
  });

  beforeEach(() => cy.visit(home.pathname));

  it('should open CV in a new tab (for browsers with PDF reader built-in)', () => {
    const href = `https:${ctx.cv}`;

    cy.contains('Download CV')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', href);

    cy.request(href)
      .its('headers')
      .should('have.a.property', 'content-type', 'application/pdf');
  });
});
