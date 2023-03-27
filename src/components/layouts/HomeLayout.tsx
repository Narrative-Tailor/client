import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {ReactNode} from "react";

import homeIcon from "public/home.svg";

type NavMenuProps = {
  href: string;
  title: string;
  icon?: ReactNode;
  isCurrent: boolean;
};
const defaultLinkStyle = "w-28 h-16 flex items-center justify-center hover:bg-yellow-200";

function NavMenu({href, title, icon, isCurrent}: NavMenuProps) {
  const linkStyle = isCurrent ? defaultLinkStyle.concat(" bg-yellow-200") : defaultLinkStyle;

  return (
    <Link href={href} className={linkStyle}>
      {icon}
      <span className="ml-3 whitespace-nowrap">{title}</span>
    </Link>
  );
}

type LayoutProps = {
  children: ReactNode;
};
export default function HomeLayout({children}: LayoutProps) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="h-full w-full">
      <nav className="sticky inset-x-0 top-0 mx-auto flex h-16 w-full items-center bg-yellow-300">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <NavMenu
          href="/"
          title="내 서재"
          icon={<Image src={homeIcon} alt="홈 아이콘" />}
          isCurrent={currentPath === "/"}
        />
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
