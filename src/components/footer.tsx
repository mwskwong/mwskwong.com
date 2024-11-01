"use cache";

import { Icon } from "./contentful";
import { firstName, lastName, middleName } from "@/constants/content";
import { getSocialMediaProfiles } from "@/lib/queries";
import Image from "next/image";
import { type ComponentProps, type FC } from "react";

export type FooterProps = Omit<ComponentProps<"footer">, "children">;
export const Footer: FC<FooterProps> = async () => {
  const socialMediaProfiles = await getSocialMediaProfiles();

  return (
    <footer className="footer footer-center p-10">
      <aside>
        <Image alt="logo" height={50} src="/icon-light.svg" width={50} />
        <p className="font-bold">
          {lastName.toUpperCase()}, {firstName} {middleName}
        </p>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved
          <br />
          Branding logo designed by{" "}
          <a
            className="link link-primary"
            href="https://www.upwork.com/freelancers/manojk4"
            rel="noreferrer"
            target="_blank"
          >
            Manoj Kumar
          </a>
        </p>
      </aside>
      <nav className="flex gap-4">
        {socialMediaProfiles.map(
          ({ socialMedia, url }) =>
            socialMedia && (
              <a
                key={socialMedia.id}
                className="btn btn-square btn-ghost"
                href={url}
                rel="noreferrer"
                target="_blank"
              >
                <Icon contentfulId={socialMedia.id} size={20} />
              </a>
            ),
        )}
      </nav>
    </footer>
  );
};
