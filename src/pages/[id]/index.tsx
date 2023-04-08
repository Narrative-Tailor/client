/* eslint-disable import/extensions */
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

// import NovelLayout from "@components/layouts/NovelLayout";

import {useAutoSave, useInput, useTextStyle} from "@hooks/index";
import Link from "next/link";
import bridgeIcon from "public/bridge.png";
import commentIcon from "public/comment.png";
import pictureIcon from "public/picture.png";
import mindmapIcon from "public/mindmap.png";
import episodeIcon from "public/note.png";
import ChapterList from "@/components/editor/ChapterList";
import useStoryStore from "@/store/storyStore";
import ChipButtonList, {ChipListItem, useChipList} from "@/components/atoms/Chip/ChipList";
// import ChipButton from "@/components/atoms/Chip/ChipButton";
import ContextGenerator from "@/components/tool-sections/ContextGenerator";
import TextStyleGenerator from "@/components/tool-sections/TextStyleGenerator";
import ImageGenerator from "@/components/tool-sections/ImageGenerator";
import MMGenerator from "@/components/tool-sections/MMGenerator";
import EpisodeGenerator from "@/components/tool-sections/EpisodeGenerator";

const AUTOSAVE_INTERVAL_MS = 30000;

const TABS = ["맥락", "문체", "그림", "연상어", "에피소드"];
const CHIPS: ChipListItem[] = TABS.map((tab, idx) => ({id: idx + 1, label: tab}));
const CHIP_IMAGE: Record<string, string> = {
  맥락: bridgeIcon.src,
  문체: commentIcon.src,
  그림: pictureIcon.src,
  연상어: mindmapIcon.src,
  에피소드: episodeIcon.src,
};
export default function Editor() {
  const {stories, saveChapter} = useStoryStore();
  const {isLoading: textStyleLoading, data: textStyles} = useTextStyle();
  const router = useRouter();
  const query = router.query as unknown as {id: string; chapter?: string};
  const {id, chapter} = query;

  const currentStory = stories.find(({id: storyId}) => storyId === parseInt(id, 10));

  const {selectedChip, handleClickChip} = useChipList(CHIPS);

  const {value: title, onChangeValue: onChangeTitle, setValue: setTitle} = useInput();
  const {value: content, onChangeValue: onChangeContent, setValue: setContent} = useInput();

  // const startAutoSave = false && title.length > 0 || content.length > 0;
  const startAutoSave = false;
  const handleSaveContent = () => {
    if (!currentStory || !query?.chapter) return;
    const chapterId = parseInt(query.chapter, 10);
    saveChapter(currentStory.id, chapterId, title, content);
  };
  useAutoSave(handleSaveContent, AUTOSAVE_INTERVAL_MS, startAutoSave);

  const handleClickChapter = (chapterId: number) => {
    router.replace(`/${currentStory?.id}?chapter=${chapterId}`);
  };

  useEffect(() => {
    if (!query?.chapter) {
      setTitle("");
      setContent("");
      if (currentStory?.chapters.length && currentStory?.chapters.length > 0) {
        router.push(`/${currentStory?.id}?chapter=${currentStory?.chapters[0].id}`);
      }
      return;
    }
    const chapterId = parseInt(query.chapter, 10);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const chapter = currentStory?.chapters.find(({id}) => id === chapterId);

    if (!chapter) {
      setTitle("");
      setContent("");
      return;
    }

    setTitle(chapter.title);
    setContent(chapter?.content ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.chapter]);

  const [menuOpened, setMenuOpened] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toolbarOpened, setToolbarOpened] = useState(true);

  useEffect(() => {
    if (!currentStory) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStory]);

  return (
    <div className="h-screen">
      <div className="flex h-full w-full">
        <div
          className="relative flex flex-col bg-[#F2F2F0] transition-all"
          style={{
            width: menuOpened ? "25vw" : "48px",
            minWidth: menuOpened ? "280px" : "90px",
            boxShadow: "2px 4px 7px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%)",
          }}
        >
          <div className="flex-1">
            <ChapterList
              id={id}
              chapterId={chapter}
              menuOpened={menuOpened}
              onClickChapter={handleClickChapter}
              handleMenu={() => {
                setMenuOpened((prev) => !prev);
              }}
            />
          </div>
          <div className="flex h-12 w-full justify-center gap-2 border-t border-[#E8E8E6]">
            <Link
              href={`/${currentStory?.id}/settings`}
              className="flex h-full w-full items-center justify-center gap-2 px-4"
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
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {menuOpened && <span className="ml-2 flex-1">작품관리</span>}
            </Link>
          </div>
        </div>
        <div className="flex h-full w-full min-w-0 max-w-[100%] transition-all">
          <div className="flex-1" />
          <div className="h-full w-full flex-[7.6] py-10">
            <h3 className="title px-4 pt-2 text-[20px] leading-6">{currentStory?.title}</h3>
            <div className="flex h-[calc(100%-50px)] w-full flex-1 flex-col">
              {query?.chapter && (
                <div className="flex h-full w-full max-w-full flex-col items-start text-[16px] leading-[1.5]">
                  <div className="flex w-full  items-center border-b border-[#E8E8E6] py-5">
                    <input
                      type="text"
                      placeholder="회차 제목을 입력하세요."
                      className="h-full w-full px-4 text-3xl  outline-none"
                      value={title}
                      onChange={onChangeTitle}
                    />
                  </div>
                  <textarea
                    className="h-full w-full resize-none p-3 text-lg outline-none"
                    name="novel-content"
                    placeholder="챕터 내용을 입력하세요."
                    value={content}
                    onChange={onChangeContent}
                    onBlur={() => {
                      handleSaveContent();
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1" />
        </div>
        <div
          className="flex min-h-[496px] w-[40vw] min-w-[400px] flex-col bg-white transition-transform"
          style={{boxShadow: "rgb(0 0 0 / 10%) -2px 4px 7px -1px, rgb(0 0 0 / 10%) -2px 0px 4px -2px"}}
        >
          <div className="flex w-full items-center justify-center">
            <ChipButtonList>
              {CHIPS.map((chip) => (
                <button
                  key={`${chip} ${chip.id}`}
                  onClick={() => handleClickChip(chip.id)}
                  className="flex flex-col items-center justify-center gap-1"
                >
                  <img
                    src={CHIP_IMAGE[chip.label]}
                    alt={`${chip.label} 아이콘`}
                    className="h-8 w-8"
                    style={{opacity: selectedChip?.id === chip.id ? 0.99 : 0.6}}
                  />
                  <span
                    className="text-[13px]"
                    style={{
                      textDecoration: selectedChip?.id === chip.id ? "underline" : "",
                      color: selectedChip?.id === chip.id ? "black" : "#777777",
                    }}
                  >
                    {chip.label}
                  </span>
                </button>
              ))}
            </ChipButtonList>
          </div>
          <section className="w-full overflow-auto">
            {selectedChip?.label === "맥락" && <ContextGenerator />}
            {selectedChip?.label === "문체" && (
              <TextStyleGenerator textStyles={textStyles} loading={textStyleLoading} />
            )}
            {selectedChip?.label === "그림" && <ImageGenerator />}
            {selectedChip?.label === "연상어" && <MMGenerator />}
            {selectedChip?.label === "에피소드" && <EpisodeGenerator />}
          </section>
        </div>
      </div>
    </div>
  );
}
