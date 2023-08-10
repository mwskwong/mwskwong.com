import client from "./client";
import { SkillCategorySkeleton, SkillSkeleton } from "./types";

const getSkillCategories = async () => {
  const [{ items: skills }, { items: skillCategories }] = await Promise.all([
    client.getEntries<SkillSkeleton>({
      content_type: "skill",
      "fields.category[exists]": true,
      order: ["-fields.proficiency", "fields.name"],
    }),
    client.getEntries<SkillCategorySkeleton>({
      content_type: "skillCategory",
      order: ["-fields.proficiency", "fields.name"],
    }),
  ]);

  return skillCategories.map((skillCategory) => ({
    id: skillCategory.sys.id,
    name: skillCategory.fields.name,
    skills: skills
      .filter((skill) => skill.fields.category?.sys.id === skillCategory.sys.id)
      .map((skill) => skill.fields.name),
  }));
};

export default getSkillCategories;
