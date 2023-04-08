import {useRef, useState} from "react";

import Toolbar from "@components/editor/Toolbar";
import Link from "next/link";
// eslint-disable-next-line import/extensions
import logoImage from "public/logo.png";
import useStoryStore from "@/store/storyStore";
import {useInput} from "@/hooks";

const useToolbar = (storyId: number) => {
  const {stories, addChapter, deleteChapter} = useStoryStore();
  const currentStory = stories.find(({id}) => id === storyId);

  const handleAddChapter = (title: string) => {
    addChapter(storyId, title);
  };
  const handleDeleteChapter = (chapterId: number) => {
    deleteChapter(storyId, chapterId);
  };

  return {
    currentStory,
    handleAddChapter,
    handleDeleteChapter,
  };
};

type ChapterListProps = {
  id: string;
  chapterId: string | undefined;
  menuOpened: boolean;
  onClickChapter: (id: number) => void;
  handleMenu: () => void;
};
export default function ChapterList({id, chapterId, menuOpened, onClickChapter, handleMenu}: ChapterListProps) {
  const {currentStory, handleAddChapter: addChapter, handleDeleteChapter: deleteChapter} = useToolbar(parseInt(id, 10));
  const chapters = currentStory?.chapters;

  const {value: chapterTitle, onChangeValue: onChangeChapterTitle, setValue: setChapterTitle} = useInput();
  const [isAdding, setIsAdding] = useState(false);
  const chapterTitleRef = useRef<HTMLInputElement>(null);

  const handleClickAdd = () => {
    setIsAdding(true);

    setTimeout(() => {
      chapterTitleRef.current?.focus();
    });
  };

  const handleAddChapter = (value: string) => {
    addChapter(value);
    setIsAdding(false);
    setChapterTitle("");
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDeleteChapter = (chapterId: number) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const chapter = currentStory?.chapters.find(({id}) => id === chapterId);

    if (window.confirm(`"${chapter?.title}" 챕터를 삭제하시겠습니까?`)) {
      deleteChapter(chapterId);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex w-full items-center justify-between border-b border-[#E8E8E6] p-2 px-4">
        <Link href="/" className="flex h-full items-center justify-center gap-2 px-3 text-xl">
          <img src={logoImage.src} alt="로고" className="h-9 w-9" />
          <span className="whitespace-nowrap transition-all">{menuOpened ? "Narrative Tailor" : ""}</span>
        </Link>
        <button onClick={handleMenu} className="h-7 w-7">
          {menuOpened ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          )}
        </button>
      </div>
      {menuOpened && <Toolbar title={currentStory?.title ?? ""} onClickAddChapter={handleClickAdd} />}
      {menuOpened && (
        <div className="flex-1">
          <ul className="h-full w-full">
            {chapters?.map((chapter, index) => (
              <li
                className="group flex cursor-pointer items-center justify-between px-4 py-1 transition-opacity hover:bg-[#eaeaea]"
                key={chapter.id}
                onClick={() => onClickChapter(chapter.id)}
                style={{
                  textDecoration: chapterId && parseInt(chapterId, 10) === chapter.id ? "underline" : "",
                  opacity: menuOpened ? 0.99 : 0,
                }}
              >
                <span className="flex-1 whitespace-nowrap px-4 py-1 text-[15px]">
                  {index + 1}화. {chapter.title}
                </span>

                <button
                  className="aspect-square h-full opacity-0  group-hover:opacity-[0.99]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChapter(chapter.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </li>
            ))}
            {!isAdding && chapters?.length === 0 && (
              <p
                className="flex w-full cursor-pointer items-center justify-center px-2 py-1  text-[14px] text-[#585856] opacity-90"
                onClick={handleClickAdd}
              >
                새로운 챕터를 추가해보세요.
              </p>
            )}
          </ul>
          {isAdding && (
            <input
              ref={chapterTitleRef}
              placeholder="챕터 제목을 입력해주세요."
              className="w-full rounded-[5px] border border-[#E8E8E6] px-2 py-1"
              value={chapterTitle}
              onChange={onChangeChapterTitle}
              onBlur={() => {
                const trimmedTitle = chapterTitle.trim();
                if (trimmedTitle) return;

                setIsAdding(false);
                setChapterTitle("");
              }}
              onKeyDown={({code}) => {
                if (code === "Enter") {
                  const trimmedTitle = chapterTitle.trim();
                  if (trimmedTitle.length > 0) {
                    handleAddChapter(trimmedTitle);
                  }
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
