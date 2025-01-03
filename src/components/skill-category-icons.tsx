import {
  backend,
  cms,
  database,
  devOps,
  frontend,
  machineLearning,
  mobile,
  monitoring,
  qa,
  toolsAndPlatforms,
} from "@/constants/contentful-ids";
import {
  type Icon,
  IconActivity,
  IconBrain,
  IconDatabase,
  IconDeviceDesktopCog,
  IconDevices,
  IconLayout,
  IconServer,
  IconSettings,
  IconTestPipe,
  IconTools,
} from "@tabler/icons-react";

export const SkillCategoryIcons = {
  [backend]: IconServer,
  [cms]: IconDeviceDesktopCog,
  [database]: IconDatabase,
  [devOps]: IconSettings,
  [frontend]: IconLayout,
  [machineLearning]: IconBrain,
  [mobile]: IconDevices,
  [qa]: IconTestPipe,
  [monitoring]: IconActivity,
  [toolsAndPlatforms]: IconTools,
} as Record<string, Icon>;
