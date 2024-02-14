describe('template spec', () => {
  it('passes', () => {
    // eslint-disable-next-line no-console -- debug
    cy.visit('/').then((win) => console.log(win.location.href));
  });
});
