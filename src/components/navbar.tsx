import { routes } from "@/constants/site-config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps, type FC } from "react";

const nav = [routes.blog, routes.guestbook];

export type NavbarProps = Omit<ComponentProps<"div">, "children">;
export const Navbar: FC<NavbarProps> = ({ className, ...props }) => {
  return (
    <div className={cn("navbar bg-base-100", className)} {...props}>
      <div className="flex-1">
        <Link className="btn btn-square btn-ghost" href={routes.home}>
          <Image priority alt="" height={32} src="/icon-light.svg" width={32} />
        </Link>
      </div>
      <ul className="menu menu-horizontal hidden px-0 md:inline-flex">
        {nav.map((route) => (
          <li key={`${route.pathname}-${route.hash ?? ""}`}>
            <Link href={route}>{route.name}</Link>
          </li>
        ))}
      </ul>
      <div className="dropdown dropdown-end md:hidden">
        <div
          aria-label="toggle nav drawer"
          className="btn btn-square btn-ghost"
          role="button"
          tabIndex={0}
        >
          <Menu size={20} />
        </div>
        <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 shadow">
          {nav.map((route) => (
            <li key={`${route.pathname}-${route.hash ?? ""}`}>
              <Link href={route}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
