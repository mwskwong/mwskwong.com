import { cache } from 'react';

import { contentful } from './clients';
import { SkillCategorySkeleton, SkillSkeleton } from './types';

export const getSkillCategories = cache(async () => {
  const [{ items: skills }, { items: skillCategories }] = await Promise.all([
    contentful.getEntries<SkillSkeleton>({
      select: ['fields'],
      content_type: 'skill',
      'fields.category[exists]': true,
      order: ['-fields.proficiency', 'fields.name'],
    }),
    contentful.getEntries<SkillCategorySkeleton>({
      select: ['sys.id', 'fields.name'],
      content_type: 'skillCategory',
      order: ['-fields.proficiency', 'fields.name'],
    }),
  ]);

  return skillCategories.map((skillCategory) => ({
    id: skillCategory.sys.id,
    name: skillCategory.fields.name,
    skills: skills
      .filter((skill) => skill.fields.category?.sys.id === skillCategory.sys.id)
      .map((skill) => skill.fields.name),
  }));
});
