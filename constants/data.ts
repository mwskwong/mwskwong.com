import {
  SiContentful,
  SiMui,
  SiNextdotjs,
  SiReact,
  SiReacthookform,
  SiVercel,
} from "@icons-pack/react-simple-icons";
import { IconType } from "@icons-pack/react-simple-icons/types";

import SiFormspree from "@/components/icons/si-formspree";
import SiImprovMX from "@/components/icons/si-improvmx";

export const phone = "+852 6095 4241";
export const email = "contact@mwskwong.com";
export const address = "Hong Kong";
export const contact = { phone, email, address };

export const jobTitles = ["Frontend Dev", "System DBA"];

export const firstName = "Matthew";
export const middleName = "Wang Shun";
export const lastName = "Kwong";
export const name = { firstName, middleName, lastName };

export const selfIntroduction =
  "Dynamic and experienced Frontend Developer and System Database Administrator. Skilled in frontend development, database management, analytical thinking, and creative problem-solving. Adaptable team player with the ability to work independently and an eagerness to succeed.";

export const websiteTechStack = [
  {
    name: "React",
    Icon: SiReact as IconType,
    url: "https://react.dev/",
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs as IconType,
    url: "https://nextjs.org/",
  },
  {
    name: "MUI Joy UI",
    Icon: SiMui as IconType,
    url: "https://mui.com/",
  },
  {
    name: "React Hook Form",
    Icon: SiReacthookform as IconType,
    url: "https://react-hook-form.com/",
  },
  {
    name: "Vercel",
    Icon: SiVercel as IconType,
    url: "https://vercel.com/",
  },
  {
    name: "Contentful",
    Icon: SiContentful as IconType,
    url: "https://www.contentful.com/",
  },
  {
    name: "Formspree",
    Icon: SiFormspree,
    url: "https://formspree.io/",
  },
  {
    name: "ImprovMX",
    Icon: SiImprovMX,
    url: "https://improvmx.com/",
  },
];
