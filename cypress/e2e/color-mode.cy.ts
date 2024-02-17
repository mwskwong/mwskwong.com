import { colors } from '../fixtures/colors';

describe('Color mode', () => {
  const expectColorMode = (colorMode: 'dark' | 'light') => {
    cy.get('html').should('have.attr', 'data-joy-color-scheme', colorMode);
    cy.get('body')
      .should('have.css', 'background-color', colors[colorMode].bgColor)
      .and('have.css', 'color', colors[colorMode].color);
  };

  beforeEach(() => cy.visit('/'));

  it('default is light mode', () => expectColorMode('light'));

  describe('Mode toggle button', () => {
    it('toggles color mode', () => {
      cy.get('[data-cy="mode-toggle-button"]').click();
      expectColorMode('dark');

      cy.get('[data-cy="mode-toggle-button"]').click();
      expectColorMode('light');
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
