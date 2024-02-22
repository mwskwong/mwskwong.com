import { sliderClasses } from '@mui/joy';

import { about } from '../fixtures/nav';
import { Ctx } from '../support/e2e';

describe('Skill set', () => {
  const { skillSet } = Cypress.env('ctx') as Ctx;

  beforeEach(() => {
    cy.visit(`${about.pathname}#${about.id}`);
    cy.get('[data-cy="skill-set"]').as('skillSetElem');
  });

  for (const { id, name, skills } of skillSet) {
    describe(`${name} category`, () => {
      it(`displays "${name}" as the title`, () => {
        cy.get('@skillSetElem')
          .find(`[data-cy=${id}]`)
          .find('[data-cy="title"]')
          .contains(name)
          .should('be.visible');
      });

      for (const { name, url } of skills) {
        it(`contains "${name}" skill ${url ? `which links to ${url}` : ''}`, () => {
          cy.get('@skillSetElem')
            .find(`[data-cy=${id}]`)
            .contains(new RegExp(`^${name}$`))
            .should('be.visible')
            .parent()
            .as('chip');

          if (url) {
            cy.get('@chip')
              .find('a')
              .should('have.attr', 'target', '_blank')
              .and('have.attr', 'href', url);
          } else {
            cy.get('@chip').find('a').should('not.exist');
          }
        });
      }
    });
  }

  describe('Skill proficiency slider', () => {
    const targetProficiency = [2, 4] as const;

    it('filters the skill set by proficiency 2 - 4', () => {
      cy.get('@skillSetElem')
        .find('[data-cy="skill-proficiency-slider"]')
        .within(($slider) => {
          cy.get(`.${sliderClasses.thumb}`).as('thumbs');
          cy.get('@thumbs').first().as('leftThumb');
          cy.get('@thumbs').last().as('rightThumb');

          const sliderBoundingBox = $slider.get(0).getBoundingClientRect();
          const maxProficiency = 5;

          cy.root().click(
            sliderBoundingBox.width *
              // (the selection range is between 1 - 1.999... so the sweetest spot is the middle of it, i.e. 1.5)
              ((targetProficiency[0] - 0.5) / maxProficiency),
            0,
          );
          cy.get('@leftThumb')
            .contains(targetProficiency[0])
            .should('be.visible');

          cy.root().click(
            sliderBoundingBox.width *
              ((targetProficiency[1] - 0.5) / maxProficiency),
            0,
          );
          cy.get('@rightThumb')
            .contains(targetProficiency[1])
            .should('be.visible');
        });

      for (const { id, name, skills } of skillSet) {
        cy.log(`${name} category`);

        const hasSkills = skills.some(
          ({ proficiency }) =>
            proficiency >= targetProficiency[0] &&
            proficiency <= targetProficiency[1],
        );

        if (hasSkills) {
          cy.get('@skillSetElem').find(`[data-cy=${id}]`).should('be.visible');
          for (const { name, proficiency } of skills) {
            cy.log(`${name} skill`);
            if (
              proficiency >= targetProficiency[0] &&
              proficiency <= targetProficiency[1]
            ) {
              cy.get('@skillSetElem')
                .find(`[data-cy=${id}]`)
                .contains(new RegExp(`^${name}$`))
                .should('be.visible');
            } else {
              cy.get('@skillSetElem')
                .find(`[data-cy=${id}]`)
                .contains(new RegExp(`^${name}$`))
                .should('not.exist');
            }
          }
        } else {
          cy.get('@skillSetElem').find(`[data-cy=${id}]`).should('not.exist');
        }
      }
    });
  });
});
