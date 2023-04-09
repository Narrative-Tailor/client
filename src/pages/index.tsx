import {useRouter} from "next/router";

import Layout from "@components/layouts/HomeLayout";
import CreateNovelModal, {useCreateNovelModal} from "@components/CreateNovelModal";
import useMount from "@hooks/useMount";
// eslint-disable-next-line import/extensions
import bookImage from "public/book.png";
import useStoryStore, {Story} from "@/store/storyStore";
import ChipButton from "@/components/atoms/Chip/ChipButton";

function StoryItem({story}: {story: Story}) {
  const {id, title, description, chapters} = story;
  const router = useRouter();

  const goNovelPage = async () => {
    await router.push(`/${id}`);
  };

  return (
    <div
      className="flex h-56 w-full cursor-pointer items-center justify-center border border-[#dcdcdc] bg-white p-8"
      onClick={goNovelPage}
    >
      <div className="flex h-full w-full items-center justify-center gap-8">
        <div className="aspect-square h-full bg-[#F2F2F0]">
          {story.thumbnail && (
            <img src={story.thumbnail.src} alt={story.thumbnail.name} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="flex h-full flex-1 flex-col gap-2">
          <h3 className="mb-1 p-0 text-4xl">{title}</h3>
          <p className="p-0 text-[13px]">
            {chapters.length ? `총 ${chapters.length}화` : "아직 작성된 글이 없습니다."}
          </p>
          {description && (
            <p className="flex-1 overflow-y-hidden text-ellipsis whitespace-nowrap p-0 text-[15px]">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const {stories} = useStoryStore();
  const mounted = useMount();
  const {isOpen, openModal, closeModal, makeNewStory} = useCreateNovelModal();

  return (
    <Layout
      rightButtons={
        <div className="flex">
          <ChipButton
            isSelected={false}
            label="작품 추가"
            onClick={openModal}
            className="rounded-full border border-[#E8E8E6] py-2 px-5"
          />
        </div>
      }
    >
      <div className="relative mx-auto max-w-[1024px] bg-[#fefcfc]">
        <div className="my-6 flex w-full flex-col items-center justify-center gap-5 px-4">
          <h2 className="flex flex-col items-center justify-center gap-2 py-5 text-lg">
            <img src={bookImage.src} alt="" className="h-14 w-14" />
            작가님의 작품 목록
          </h2>
        </div>

        <div className="flex w-full flex-col gap-4">
          {mounted && stories.map((story) => <StoryItem story={story} key={`story-${story.id}`} />)}
          {mounted && stories.length === 0 && (
            <div
              className="flex h-40 w-full cursor-pointer items-center justify-center border border-[#dcdcdc] bg-white p-8"
              onClick={openModal}
            >
              새로운 작품을 만들어보세요!
            </div>
          )}
        </div>
      </div>
      <CreateNovelModal isOpen={isOpen} onCancel={closeModal} onConfirm={makeNewStory} />
    </Layout>
  );
}
