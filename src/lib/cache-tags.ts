export const blogTags = {
  all: ['blogs'],
  lists: () => [...blogTags.all, `${blogTags.all[0]}:lists`],
  list: ({ page, pageSize = 9 }: { page: number; pageSize?: number }) => [
    ...blogTags.lists(),
    `${blogTags.lists()[1]}:${page}:${pageSize}`,
  ],
  details: () => [...blogTags.all, `${blogTags.all[0]}:details`],
  detail: (slug: string) => [
    ...blogTags.details(),
    `${blogTags.details()[1]}:${slug}`,
  ],
  allMetadata: () => [...blogTags.all, `${blogTags.all[0]}:metadata`],
  metadata: (id: string) => [
    ...blogTags.allMetadata(),
    `${blogTags.allMetadata()[1]}:${id}`,
  ],
};

export const courseTags = {
  all: ['courses'],
  lists: () => [...courseTags.all, `${courseTags.all[0]}:lists`],
};

export const cvTags = { all: ['cv'] };

export const educationTags = {
  all: ['educations'],
  lists: () => [...educationTags.all, `${educationTags.all[0]}:lists`],
};

export const experienceTags = {
  all: ['experiences'],
  lists: () => [...experienceTags.all, `${experienceTags.all[0]}:lists`],
};

export const personalPhotoTags = { all: ['personal-photo'] };

export const platformProfileTags = {
  all: ['platform-profiles'],
  lists: () => [
    ...platformProfileTags.all,
    `${platformProfileTags.all[0]}:lists`,
  ],
};

export const skillCategoryTags = {
  all: ['skill-categories'],
  lists: () => [...skillCategoryTags.all, `${skillCategoryTags.all[0]}:lists`],
};
