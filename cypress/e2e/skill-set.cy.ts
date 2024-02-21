import { about } from '../fixtures/nav';
import { SkillSet, getSkillSet } from '../support/queries';

interface SkillSetCtx {
  skillSet?: SkillSet;
}

describe('Skill Set', () => {
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

  it('displays the entire skill set', () => {
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
});
