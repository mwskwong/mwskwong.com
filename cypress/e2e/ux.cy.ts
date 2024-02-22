import { blog, guestbook, home, privacyPolicy } from '../fixtures/nav';
import { xs } from '../fixtures/viewports';

describe('UX', () => {
  describe('Horizontal scrolling', xs, () => {
    const pages = [
      home.pathname,
      blog.pathname,
      guestbook.pathname,
      privacyPolicy.pathname,
    ];

    for (const page of pages) {
      it(`${page} should not be able to scroll horizontally`, () => {
        cy.visit(page);
        cy.document().then((doc) => {
          expect(doc.documentElement.scrollWidth).to.equal(
            doc.documentElement.clientWidth,
          );
        });
      });
    }
  });
});
