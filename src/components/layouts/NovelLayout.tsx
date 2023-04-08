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
};
export default function NovelLayout({children}: NovelLayoutProps) {
  // const [width, setWidth] = useState(window?.innerWidth);

  // useEffect(() => {}, []);
  return (
    <div className="relative h-screen overflow-hidden bg-transparent">
      <div className="flex w-full flex-col overflow-hidden">
        <nav className="z-10 max-w-full select-none bg-white shadow-sm">
          <div className="relative h-[45px] w-full max-w-[100vw] opacity-100 transition-opacity">
            <div className="flex h-[45px] items-center justify-between overflow-hidden pl-[12px] pr-[10px]">
              <Link href="/" className="flex h-full items-center justify-center px-4 text-xl">
                Narrative Tailor
              </Link>
            </div>
          </div>
        </nav>
        <main className="relative z-[1] flex h-[calc(100vh-45px)] max-h-[100%] w-full shrink grow-0 flex-col bg-white">
          <div className="relative z-[1] mr-0 mb-0 flex grow flex-col items-center overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
