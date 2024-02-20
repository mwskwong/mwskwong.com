import { about } from '../fixtures/nav';
import { contentful } from '../support/clients';
import { SkillCategorySkeleton, SkillSkeleton } from '../support/types';

const getSkillSet = async () => {
  const [{ items: skills }, { items: skillCategories }] = await Promise.all([
    contentful.getEntries<SkillSkeleton>({
      content_type: 'skill',
      'fields.category[exists]': true,
      order: ['-fields.proficiency', 'fields.name'],
    }),
    contentful.getEntries<SkillCategorySkeleton>({
      content_type: 'skillCategory',
      order: ['-fields.proficiency', 'fields.name'],
    }),
  ]);

  return skillCategories.map((skillCategory) => ({
    id: skillCategory.sys.id,
    name: skillCategory.fields.name,
    skills: skills
      .filter((skill) => skill.fields.category?.sys.id === skillCategory.sys.id)
      .map((skill) => ({
        name: skill.fields.name,
        proficiency: skill.fields.proficiency,
        url: skill.fields.url,
      })),
  }));
};

type SkillSet = Awaited<ReturnType<typeof getSkillSet>>;

describe('Skill Set', () => {
  beforeEach(() => {
    cy.visit(`${about.pathname}#${about.id}`);
    cy.wrap(getSkillSet()).as('skillSet');
    cy.get('[data-cy="skill-set"]').as('skillSetElem');
  });

  it('displays the entire skill set with the skill category name as the title and skills listed out', () => {
    cy.get<SkillSet>('@skillSet').then((skillSet) => {
      for (const { id, name, skills } of skillSet) {
        cy.get('@skillSetElem')
          .get(`[data-cy=${id}]`)
          .within(() => {
            cy.get('[data-cy="title"]').contains(name).should('be.visible');
            for (const { name } of skills) {
              cy.contains(name).should('be.visible');
            }
          });
      }
    });
  });

  describe('Skills', () => {
    it('displays the skill name and links to the corresponding webpage', () => {
      cy.get<SkillSet>('@skillSet').then((skillSet) => {
        for (const { id, skills } of skillSet) {
          cy.get('@skillSetElem')
            .get(`[data-cy=${id}]`)
            .within(() => {
              for (const { name, url } of skills) {
                cy.contains(name).parent().as('chip');
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
    });
  });

  // TODO: test for filter by proficiency
});
