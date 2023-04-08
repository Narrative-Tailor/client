import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import NovelLayout from "@components/layouts/NovelLayout";

import {useAutoSave, useInput} from "@hooks/index";
import ChapterList from "@/components/editor/ChapterList";
import useStoryStore from "@/store/storyStore";
import ChipButtonList, {ChipListItem, useChipList} from "@/components/atoms/Chip/ChipList";
import ChipButton from "@/components/atoms/Chip/ChipButton";
import ContextGenerator from "@/components/tool-sections/ContextGenerator";
import TextStyleGenerator from "@/components/tool-sections/TextStyleGenerator";
import ImageGenerator from "@/components/tool-sections/ImageGenerator";
import MMGenerator from "@/components/tool-sections/MMGenerator";
import EpisodeGenerator from "@/components/tool-sections/EpisodeGenerator";

const AUTOSAVE_INTERVAL_MS = 30000;

const TABS = ["맥락", "문체", "그림", "MM", "에피소드"];
const CHIPS: ChipListItem[] = TABS.map((tab, idx) => ({id: idx + 1, label: tab}));

export default function Editor() {
  const {stories, saveChapter} = useStoryStore();
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

  return (
    <NovelLayout id={id}>
      <div className="h-full w-full">
        <div
          className="fixed left-0 bottom-0 top-[45px] flex w-[240px] flex-col bg-[#F2F2F0] transition-transform"
          style={{
            transform: menuOpened ? "translateX(0)" : "translateX(calc(-100% + 32px))",
          }}
        >
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
        <div className="mx-auto ml-[320px] h-full w-[900px] min-w-0 max-w-[100%]">
          <h3 className="px-2 pt-2 text-[20px] font-semibold">{currentStory?.title}</h3>
          <div className="flex h-[calc(100%-50px)] w-full flex-1 flex-col">
            {query?.chapter && (
              <div className="flex h-full w-full max-w-full flex-col items-start text-[16px] leading-[1.5]">
                <div className="flex h-14 w-full items-center border-b border-gray-100">
                  <input
                    type="text"
                    placeholder="회차 제목을 입력하세요."
                    className="h-full w-full px-2 text-3xl  outline-none"
                    value={title}
                    onChange={onChangeTitle}
                  />
                </div>
                <textarea
                  className="h-full w-full max-w-[900px] resize-none p-2 text-lg outline-none"
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
        <div
          className="fixed top-[45px] bottom-0 right-0 flex min-h-[496px] w-[580px] flex-col bg-[#F2F2F0] transition-transform"
          style={{transform: toolbarOpened ? "translateX(0)" : "translateX(calc(100% - 48px))"}}
        >
          <div className="flex w-full items-center justify-center p-2">
            <ChipButtonList>
              {CHIPS.map((chip) => (
                <ChipButton
                  key={`${chip} ${chip.id}`}
                  className="h-10 flex-1"
                  isSelected={selectedChip?.id === chip.id}
                  label={chip.label}
                  onClick={() => handleClickChip(chip.id)}
                  {...chip.props}
                />
              ))}
            </ChipButtonList>
          </div>
          <section className="w-full overflow-auto">
            {selectedChip?.label === "맥락" && <ContextGenerator />}
            {selectedChip?.label === "문체" && <TextStyleGenerator />}
            {selectedChip?.label === "그림" && <ImageGenerator />}
            {selectedChip?.label === "MM" && <MMGenerator />}
            {selectedChip?.label === "에피소드" && <EpisodeGenerator />}
          </section>
        </div>
      </div>
    </NovelLayout>
  );
}
