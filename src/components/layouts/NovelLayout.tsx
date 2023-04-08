import {ReactNode} from "react";
import Link from "next/link";

// type NavMenu = {
//   href: string;
//   pathname: string;
//   title: string | ReactNode;
// };

type NovelLayoutProps = {
  children: ReactNode;
  id: string;
  hideSettings?: boolean;
};
export default function NovelLayout({children, id, hideSettings}: NovelLayoutProps) {
  return (
    <div className="relative h-screen overflow-hidden bg-transparent">
      <div className="flex w-full flex-col overflow-hidden">
        <nav className="z-10 max-w-full select-none border-b border-[#E8E8E6] bg-white shadow-sm">
          <div className="relative h-[60px] w-full max-w-[100vw] opacity-100 transition-opacity">
            <div className="flex h-[60px] items-center justify-between overflow-hidden pl-[12px] pr-[10px]">
              <Link href="/" className="flex h-full items-center justify-center px-4 text-xl">
                Narrative Tailor
              </Link>
              {!hideSettings && (
                <Link
                  href={id ? `/${id}/settings` : "/"}
                  className="flex items-center justify-center rounded-full border border-[#E8E8E6] p-2 px-4 text-[14px]"
                >
                  작품 설정
                </Link>
              )}
              {hideSettings && (
                <Link
                  href={id ? `/${id}` : "/"}
                  className="flex items-center justify-center rounded-full border border-[#E8E8E6] p-2 px-4 text-[14px]"
                >
                  작품으로 돌아가기
                </Link>
              )}
            </div>
          </div>
        </nav>
        <main className="relative z-[1] flex h-[calc(100vh-60px)] w-full shrink grow-0 flex-col bg-white">
          <div className="relative z-[1] mr-0 mb-0 flex grow flex-col items-center overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
