import {
  EmailRounded,
  LocationOnRounded,
  SmartphoneRounded,
} from "@mui/icons-material";

import Contentful from "@/components/icons/contentful";
import Formspree from "@/components/icons/formspree";
import ImprovMx from "@/components/icons/improvmx";
import Mui from "@/components/icons/mui";
import NextJs from "@/components/icons/nextjs";
import React from "@/components/icons/react";
import ReactHookForm from "@/components/icons/react-hook-form";
import Vercel from "@/components/icons/vercel";

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
    Icon: React,
    url: "https://react.dev/",
  },
  {
    name: "Next.js",
    Icon: NextJs,
    url: "https://nextjs.org/",
  },
  {
    name: "MUI Joy UI",
    Icon: Mui,
    url: "https://mui.com/",
  },
  {
    name: "React Hook Form",
    Icon: ReactHookForm,
    url: "https://react-hook-form.com/",
  },
  {
    name: "Vercel",
    Icon: Vercel,
    url: "https://vercel.com/",
  },
  {
    name: "Contentful",
    Icon: Contentful,
    url: "https://www.contentful.com/",
  },
  {
    name: "Formspree",
    Icon: Formspree,
    url: "https://formspree.io/",
  },
  {
    name: "ImprovMX",
    Icon: ImprovMx,
    url: "https://improvmx.com/",
  },
];

export const contactInfo = [
  {
    Icon: SmartphoneRounded,
    title: "Call Me At",
    value: phone,
    url: `tel:${phone}`,
  },
  {
    Icon: EmailRounded,
    title: "Email Me At",
    value: email,
    url: `mailto:${email}`,
  },
  {
    Icon: LocationOnRounded,
    title: "Find Me At",
    value: address,
    url: "https://www.google.com/maps/place/Hong+Kong",
  },
];
