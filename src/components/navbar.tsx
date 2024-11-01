import { routes } from "@/constants/site-config";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

const nav = [routes.blog, routes.guestbook];

const Navbar: FC = () => {
  return (
    <div className="navbar bg-base-100">
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
          <Menu size={24} />
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

export default Navbar;
