/* eslint-disable @typescript-eslint/no-namespace -- Cypress extension */
/* eslint-disable @typescript-eslint/method-signature-style -- this is how Cypress defined the interface and the extension should match that */
/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      wrap<E extends Node = HTMLElement>(
        element: E | JQuery<E>,
        options?: Partial<Loggable & Timeoutable>,
      ): Chainable<JQuery<E>>;

      wrap<S>(
        object: S | Promise<S>,
        options?: Partial<Loggable & Timeoutable>,
      ): Chainable<S>;

      shouldOpenLinkInNewTab(): Chainable<JQuery<HTMLAnchorElement>>;
    }
  }
}

Cypress.Commands.add(
  'shouldOpenLinkInNewTab',
  { prevSubject: 'element' },
  (subject) => {
    cy.wrap(subject)
      .should('have.attr', 'target', '_blank')
      .invoke('attr', 'href')
      .then((href) => {
        expect(href).to.be.a('string');

        if (href) {
          cy.request({ url: href, failOnStatusCode: false }).then(
            ({ status }) => {
              const url = new URL(href);
              if (url.hostname === 'www.linkedin.com') {
                // 999 is the status code returned when LinkedIn is visited by bots
                expect(status).to.satisfy(
                  (status: number) =>
                    (status >= 200 && status <= 399) || status === 999,
                );
              } else {
                expect(status).to.be.within(200, 399);
              }
            },
          );
        }
      });
  },
);

export {};
