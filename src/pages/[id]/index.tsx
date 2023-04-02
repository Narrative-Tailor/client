import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import Button from "@components/atoms/Button";
import NovelLayout from "@components/layouts/NovelLayout";

import {useAutoSave, useTabs, useInput, useBridge, useOptions, useTextStyle} from "@hooks/index";
import ChapterList from "@/components/editor/ChapterList";
import useStoryStore from "@/store/storyStore";

const AUTOSAVE_INTERVAL_MS = 30000;

const TABS = ["맥락", "문체"];

const useTextStyleOptions = () => {
  const textStyles = useTextStyle();
  const options = textStyles
    .filter((textStyle) => textStyle.isAvailable)
    .map((textStyle) => ({label: textStyle.value, value: textStyle.value}));

  const defaultOptions = options.length > 0 ? options[0] : undefined;

  const {options: textStyleOptions, handleChangeOption, selectedOption} = useOptions(options, defaultOptions);

  return {
    options: textStyleOptions,
    selectedOption,
    handleChangeOption,
  };
};

export default function Editor() {
  const {stories, saveChapter} = useStoryStore();
  const router = useRouter();
  const query = router.query as unknown as {id: string; chapter?: string};
  const {id} = query;

  const currentStory = stories.find(({id: storyId}) => storyId === parseInt(id, 10));

  const {currentTab, handleClickTab} = useTabs(TABS);
  const {
    bridgeParagraph,
    preParagraph,
    postParagraph,
    onChangePostParagraph,
    onChangePreParagraph,
    handleBridgeParagraph,
    resetBridge,
  } = useBridge();

  const {options: textStyleOptions, handleChangeOption, selectedOption} = useTextStyleOptions();

  const {value: title, onChangeValue: onChangeTitle, setValue: setTitle} = useInput();
  const {value: content, onChangeValue: onChangeContent, setValue: setContent} = useInput();

  const startAutoSave = title.length > 0 || content.length > 0;
  const handleSaveContent = () => {
    if (!currentStory || !query?.chapter) return;
    const chapterId = parseInt(query.chapter, 10);
    saveChapter(currentStory.id, chapterId, title, content);
  };
  useAutoSave(handleSaveContent, AUTOSAVE_INTERVAL_MS, startAutoSave);

  const {value: textStyleValue, onChangeValue: onChangeTextStyleValue} = useInput();
  const [transformedText, setTransformedText] = useState("");

  const handleTransformTextStyle = () => {
    switch (selectedOption?.value) {
      case "사극체":
        setTransformedText("어쩌시겠습니까?");
        break;
      case "잼민이체":
        setTransformedText("어쩔티비~");
        break;
      default:
        break;
    }
  };
  const resetTransformedText = () => {
    setTransformedText("");
  };

  const handleClickChapter = (chapterId: number) => {
    router.replace(`/${currentStory?.id}?chapter=${chapterId}`);
  };

  useEffect(() => {
    if (!query?.chapter) {
      setTitle("");
      setContent("");
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

  return (
    <NovelLayout id={id}>
      <main className="flex h-full flex-1 flex-col">
        <header className="flex h-20 w-full items-center border-b border-black bg-green-100">
          <h2>Here, book id : {id}</h2>
        </header>
        <div className="flex h-full w-full flex-1">
          <div className="flex h-full w-48 flex-col border-r border-black bg-gray-200">
            <ChapterList id={id} onClickChapter={handleClickChapter} />
          </div>
          <div className="flex flex-1">
            <div className="flex flex-1 flex-col border-b border-r border-black">
              {query?.chapter && (
                <>
                  <div className="flex h-14 w-full items-center">
                    <input
                      type="text"
                      placeholder="회차 제목을 입력하세요."
                      className="h-full w-full px-2 text-lg outline outline-black"
                      value={title}
                      onChange={onChangeTitle}
                    />
                  </div>
                  <section className="flex flex-1">
                    <div className="flex flex-1">
                      <textarea
                        name="novel-content"
                        placeholder="챕터 내용을 입력하세요."
                        className="flex-1 p-2"
                        value={content}
                        onChange={onChangeContent}
                        onBlur={() => {
                          handleSaveContent();
                        }}
                      />
                    </div>
                    {/* 문맥 추천 section */}
                  </section>
                </>
              )}
            </div>
            <div className="flex h-full w-60 flex-col border-b border-black">
              <div className="flex h-16 items-center justify-center gap-2 border-b border-black">
                {TABS.map((tab, index) => (
                  <Button
                    key={`${tab}-${index + 1}`}
                    onClick={() => handleClickTab(tab)}
                    theme={currentTab === tab ? "primary" : "secondary"}
                  >
                    {tab}
                  </Button>
                ))}
              </div>
              <section className="h-full w-60 border-l">
                {currentTab === "맥락" && (
                  <div className="flex h-full w-full flex-col gap-2 overflow-y-auto px-2">
                    <div className="flex items-center justify-end">
                      <button type="button" onClick={resetBridge}>
                        초기화
                      </button>
                    </div>
                    <div className="flex w-full flex-col items-center">
                      <h4 className="mb-2 w-full">pre</h4>
                      <textarea
                        name="pre-p"
                        className="h-36 w-full p-1"
                        value={preParagraph}
                        onChange={onChangePreParagraph}
                      />
                    </div>
                    {bridgeParagraph ? (
                      <div className="h-40 w-full overflow-y-auto border border-black p-1">
                        <p>{bridgeParagraph}</p>
                      </div>
                    ) : (
                      <Button onClick={handleBridgeParagraph}>
                        <span className="text-2xl font-medium">+</span>
                      </Button>
                    )}
                    <div className="flex w-full flex-col items-center">
                      <h4 className="mb-2 w-full">post</h4>
                      <textarea
                        name="post-p"
                        className="h-36 w-full p-1"
                        value={postParagraph}
                        onChange={onChangePostParagraph}
                      />
                    </div>
                  </div>
                )}
                {currentTab === "문체" && (
                  <div className="flex h-full w-full flex-col gap-2 overflow-y-auto px-2">
                    <div className="mb-2 flex items-center justify-between">
                      <h4>Option</h4>
                      <button type="button" onClick={resetTransformedText}>
                        새로고침
                      </button>
                    </div>
                    <select
                      className="py-1 outline outline-1 outline-black"
                      value={selectedOption?.value}
                      onChange={handleChangeOption}
                    >
                      {textStyleOptions.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-col gap-2">
                      <textarea
                        className="h-44 overflow-auto p-1"
                        value={textStyleValue}
                        onChange={onChangeTextStyleValue}
                      />

                      <Button onClick={handleTransformTextStyle}>Transform</Button>
                      {transformedText && (
                        <div className="h-44 overflow-auto border border-black p-1">
                          <p>{transformedText}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
          <div />
        </div>
      </main>
    </NovelLayout>
  );
}
