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
    if (ctx.cv) {
      cy.contains('Download CV')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'href', ctx.cv);

      cy.request(ctx.cv)
        .its('headers')
        .should('have.a.property', 'content-type', 'application/pdf');
    }
  });
});
