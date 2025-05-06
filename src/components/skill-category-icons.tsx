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

import {
  analyticsAndMonitoring,
  backend,
  cms,
  database,
  devOps,
  frontend,
  machineLearning,
  mobile,
  qa,
  toolsAndPlatforms,
} from "@/constants/contentful-ids";

export const SkillCategoryIcons = {
  [backend]: IconServer,
  [cms]: IconDeviceDesktopCog,
  [database]: IconDatabase,
  [devOps]: IconSettings,
  [frontend]: IconLayout,
  [machineLearning]: IconBrain,
  [mobile]: IconDevices,
  [qa]: IconTestPipe,
  [analyticsAndMonitoring]: IconActivity,
  [toolsAndPlatforms]: IconTools,
} as Record<string, Icon>;
