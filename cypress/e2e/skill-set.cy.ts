import { sliderClasses } from '@mui/joy';

import { about } from '../fixtures/nav';
import { SkillSet, getSkillSet } from '../support/queries';

interface SkillSetCtx {
  skillSet?: SkillSet;
}

describe('Skill set', () => {
  const ctx: SkillSetCtx = {};

  before(() => {
    cy.wrap(getSkillSet()).then((skillSet) => {
      ctx.skillSet = skillSet;
    });
  });

  beforeEach(() => {
    cy.visit(`${about.pathname}#${about.id}`);
    cy.get('[data-cy="skill-set"]').as('skillSetElem');
  });

  it('displays the entire skill set initially', () => {
    for (const { id, name, skills } of ctx.skillSet ?? []) {
      cy.log(`Testing ${name} category`);

      cy.get('@skillSetElem')
        .get(`[data-cy=${id}]`)
        .within(() => {
          cy.get('[data-cy="title"]').contains(name).should('be.visible');

          for (const { name, url } of skills) {
            cy.log(`Testing ${name} skill`);

            cy.contains(name).should('be.visible').parent().as('chip');
            if (url) {
              cy.get('@chip')
                .find('a')
                .should('have.attr', 'target', '_blank')
                .and('have.attr', 'href', url);
            } else {
              cy.get('@chip').find('a').should('not.exist');
            }
          }
        });
    }
  });

  // TODO: test for filter by proficiency
  // describe('Skill proficiency slider', () => {
  //   it.only('filters the skill set by proficiency', () => {
  //     // cy.get('[data-cy="skill-set"]').as('skillSetElem');
  //     // cy.get('[data-cy="skill-set-proficiency-slider"]').as('slider');
  //     // cy.get('@slider').invoke('val', 3).trigger('change');
  //     // cy.get('@skillSetElem').should('have.length', 1);

  //     cy.get('@skillSetElem')
  //       .get('[data-cy="skill-proficiency-slider"]')
  //       .within(($slider) => {
  //         cy.get(`.${sliderClasses.thumb}`).as('thumbs');
  //         cy.get('@thumbs').first().as('leftThumb');
  //         cy.get('@thumbs').last().as('rightThumb');

  //         const sliderBoundingBox = $slider.get(0).getBoundingClientRect();
  //         const targetRange = [2, 4] as const;
  //         const min = 1;
  //         const max = 5;

  //         cy.get('@leftThumb').drag(`.${sliderClasses.thumb}`, {
  //           target: {
  //             // use force here because Cypress mistakenly thinks the slider root is covering the slider thumb
  //             x: sliderBoundingBox.width * (targetRange[0] / max),
  //             y: 0,
  //             force: true,
  //           },
  //         });
  //         cy.get('@leftThumb').contains(targetRange[0]).should('be.visible');

  //         cy.get('@rightThumb').drag(`.${sliderClasses.thumb}`, {
  //           target: {
  //             // use force here because Cypress mistakenly thinks the slider root is covering the slider thumb
  //             x: -sliderBoundingBox.width * ((max - targetRange[1]) / max),
  //             y: 0,
  //             force: true,
  //           },
  //         });
  //         cy.get('@rightThumb').contains(targetRange[1]).should('be.visible');
  //       });
  //   });
  // });
});
