import { orderBy } from 'lodash-es';

import { cv, personalPortrait } from '@/constants/contentful-ids';

import { contentful } from './clients';
import {
  type ExperienceSkeleton,
  type ProjectSkeleton,
  type SkillCategorySkeleton,
  type SkillSkeleton,
} from './contentful-types';
import { generatePdfThumbnail } from './utils';

export const getPersonalPortrait = async () => {
  'use cache';

  const asset = await contentful.getAsset(personalPortrait);
  return {
    url: asset.fields.file && `https:${asset.fields.file.url}`,
    contentType: asset.fields.file?.contentType,
  };
};

export const getCv = async () => {
  'use cache';

  const asset = await contentful.getAsset(cv);
  return asset.fields.file && `https:${asset.fields.file.url}`;
};

export const getSkillSet = async () => {
  'use cache';

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

export const getTechStack = async () => {
  'use cache';

  const { items } = await contentful.getEntries<ProjectSkeleton>({
    content_type: 'project',
    'metadata.tags.sys.id[in]': ['techStack'],
    order: ['fields.name'],
  });

  return items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
    logo:
      item.fields.logo?.fields.file &&
      `https:${item.fields.logo.fields.file.url}`,
  }));
};

export const getExperiences = async () => {
  'use cache';

  // Goal: sort experience in DESC order by `to` date,
  // while having records with `to = undefined` (denote "Present") sorted at the top

  // Contentful always place undefined fields at the bottom,
  // so we first sort in ASC and then reverse it
  // such that it's in DESC order while undefined values are at the top
  const { items } = await contentful.getEntries<ExperienceSkeleton>({
    content_type: 'experience',
    order: ['fields.to'],
  });

  items.reverse();
  for (const item of items) {
    item.fields.skills = orderBy(item.fields.skills, 'fields.name');
  }

  return items.map((item) => ({
    id: item.sys.id,
    ...item.fields,
    company: item.fields.company && {
      name: item.fields.company.fields.name,
      url: item.fields.company.fields.url,
    },
    projects: item.fields.projects?.map((project) => ({
      name: project?.fields.name,
      url: project?.fields.url,
      thumbnail:
        project?.fields.thumbnail?.fields.file &&
        `https:${project.fields.thumbnail.fields.file.url}`,
    })),
    supportingDocuments: item.fields.supportingDocuments?.map(
      (supportingDocument) => ({
        title: supportingDocument?.fields.title,
        url:
          supportingDocument?.fields.file &&
          `https:${supportingDocument.fields.file.url}`,
        thumbnail:
          supportingDocument?.fields.file &&
          generatePdfThumbnail(`https:${supportingDocument.fields.file.url}`),
      }),
    ),
    skills: item.fields.skills
      .filter(Boolean)
      .map((skill) => ({ name: skill.fields.name, url: skill.fields.url })),
  }));
};
