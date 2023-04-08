import Link from "next/link";
import {ReactNode} from "react";
// eslint-disable-next-line import/extensions
import logoImage from "public/logo.png";

type LayoutProps = {
  children: ReactNode;
};
export default function HomeLayout({children}: LayoutProps) {
  return (
    <div className="relative h-screen">
      <nav className="flex h-[60px] items-center justify-between overflow-hidden border-b border-[#E8E8E6] bg-white pl-[12px] pr-[10px] shadow-sm">
        <Link href="/" className="flex h-full items-center justify-center gap-2 px-4 text-xl">
          <img src={logoImage.src} alt="로고" className="h-9 w-9" />
          Narrative Tailor
        </Link>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
