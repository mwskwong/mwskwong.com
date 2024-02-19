import { cv } from '../fixtures/contentful-ids';
import { contentful } from '../support/clients';

describe('Download CV', () => {
  it('should download CV', () => {
    cy.visit('/');
    cy.contains('Download CV')
      .should('have.attr', 'target', '_blank')
      .invoke('attr', 'href')
      .then((href: string) => {
        cy.wrap(contentful.getAsset(cv)).then((asset) => {
          expect(href).to.equal(`https:${asset.fields.file?.url}`);
        });
        cy.request(href)
          .its('headers')
          .should('have.a.property', 'content-type', 'application/pdf');
      });
  });
});
