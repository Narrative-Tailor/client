import Link from "next/link";
import {ReactNode} from "react";

type LayoutProps = {
  children: ReactNode;
};
export default function HomeLayout({children}: LayoutProps) {
  return (
    <div className="relative h-screen">
      <nav className="sticky inset-x-0 top-0 z-10 flex h-14 w-full bg-white shadow-sm">
        <Link href="/" className="flex h-full items-center justify-center px-4 text-xl">
          Narrative Tailor
        </Link>
      </nav>
      <main className="h-full flex-1">{children}</main>
    </div>
  );
}
