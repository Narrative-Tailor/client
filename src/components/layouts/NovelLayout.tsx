import {ReactNode} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

type NavMenu = {
  href: string;
  pathname: string;
  title: string | ReactNode;
};

type NovelLayoutProps = {
  children: ReactNode;
  id: string;
};
export default function NovelLayout({children, id}: NovelLayoutProps) {
  const router = useRouter();
  const currentPath = router.pathname;

  const menus: NavMenu[] = [
    {
      href: "/",
      pathname: "/",
      title: "내 서재",
    },
    {
      href: `/${id}`,
      pathname: "/[id]",
      title: "에디터",
    },
    {
      href: `/${id}/mind-map`,
      pathname: "/[id]/mind-map",
      title: "마인드맵",
    },
  ];

  return (
    <div className="flex h-full w-full">
      <nav className="h-screen w-20 bg-yellow-300">
        {menus.map(({href, title, pathname}) => (
          <li
            key={`link-${href}-${title}`}
            className="flex h-12 w-full items-center justify-center hover:bg-yellow-200"
          >
            <Link
              href={href}
              className={"flex h-full w-full items-center justify-center px-2".concat(
                currentPath === pathname ? " bg-yellow-200" : "",
              )}
            >
              {title}
            </Link>
          </li>
        ))}
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
