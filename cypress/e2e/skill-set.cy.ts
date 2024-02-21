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

  const expectSkillSetToDisplay = (skillSet: SkillSet) => {
    for (const { id, name, skills } of skillSet) {
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
  };

  it('displays the entire skill set initially', () => {
    if (ctx.skillSet) {
      expectSkillSetToDisplay(ctx.skillSet);
    }
  });

  // TODO: test for filter by proficiency
  describe('Skill proficiency slider', () => {
    it('filters the skill set by proficiency 2 - 4', () => {
      const targetProficiency = [2, 4] as const;

      cy.get('@skillSetElem')
        .get('[data-cy="skill-proficiency-slider"]')
        .within(($slider) => {
          cy.get(`.${sliderClasses.thumb}`).as('thumbs');
          cy.get('@thumbs').first().as('leftThumb');
          cy.get('@thumbs').last().as('rightThumb');

          const sliderBoundingBox = $slider.get(0).getBoundingClientRect();
          const maxProficiency = 5;

          cy.root().click(
            sliderBoundingBox.width *
              (targetProficiency[0] / maxProficiency) *
              0.9,
            0,
          );
          cy.get('@leftThumb')
            .contains(targetProficiency[0])
            .should('be.visible');

          cy.root().click(
            sliderBoundingBox.width * (targetProficiency[1] / maxProficiency),
            0,
          );
          cy.get('@rightThumb')
            .contains(targetProficiency[1])
            .should('be.visible');
        });

      if (ctx.skillSet) {
        expectSkillSetToDisplay(
          ctx.skillSet
            .map(({ skills, ...skillCategory }) => ({
              ...skillCategory,
              skills: skills.filter(
                ({ proficiency }) =>
                  proficiency >= targetProficiency[0] &&
                  proficiency <= targetProficiency[1],
              ),
            }))
            .filter(({ skills }) => skills.length),
        );
      }
    });
  });
});
