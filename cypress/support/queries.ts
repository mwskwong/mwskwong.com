import orderBy from 'lodash/orderBy';

import { cv } from '../fixtures/contentful-ids';

import { contentful } from './clients';
import {
  PlatformProfileSkeleton,
  SkillCategorySkeleton,
  SkillSkeleton,
} from './types';

export const getSkillSet = async () => {
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

export const getCv = async () => {
  const asset = await contentful.getAsset(cv);
  return asset.fields.file && `https:${asset.fields.file.url}`;
};

export const getPlatformProfiles = async () => {
  const { items } = await contentful.getEntries<PlatformProfileSkeleton>({
    content_type: 'platformProfile',
  });

  const platformProfiles = items.map((item) => ({
    ...item.fields,
    platform: item.fields.platform && {
      id: item.fields.platform.sys.id,
      name: item.fields.platform.fields.name,
    },
  }));

  return orderBy(platformProfiles, 'platform.name');
};
