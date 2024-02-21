import { colors } from '../fixtures/colors';
import { home } from '../fixtures/nav';

describe('Color mode', () => {
  beforeEach(() => cy.visit(home.pathname));

  const expectColorModeToBe = (colorMode: 'dark' | 'light') => {
    cy.get('html').should('have.attr', 'data-joy-color-scheme', colorMode);
    cy.get('body')
      .should('have.css', 'background-color', colors[colorMode].bgColor)
      .and('have.css', 'color', colors[colorMode].color);
  };

  it('default is light mode', () => expectColorModeToBe('light'));

  describe('Mode toggle button', () => {
    it('toggles color mode', () => {
      cy.get('[data-cy="mode-toggle-button"]').click();
      expectColorModeToBe('dark');

      cy.get('[data-cy="mode-toggle-button"]').click();
      expectColorModeToBe('light');
    });

    it('updates icon according to color mode', () => {
      const expectIcon = (icon: 'sun' | 'moon') => {
        cy.get('[data-cy="mode-toggle-button"]')
          .find('[data-cy="moon"]')
          .should(icon === 'moon' ? 'be.visible' : 'not.exist');

        cy.get('[data-cy="mode-toggle-button"]')
          .find('[data-cy="sun"]')
          .should(icon === 'sun' ? 'be.visible' : 'not.exist');
      };

      expectIcon('moon');
      cy.get('[data-cy="mode-toggle-button"]').click();
      expectIcon('sun');
      cy.get('[data-cy="mode-toggle-button"]').click();
      expectIcon('moon');
    });
  });
});
