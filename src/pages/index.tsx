import {useRouter} from "next/router";

import Layout from "@components/layouts/HomeLayout";
import CreateNovelModal, {useCreateNovelModal} from "@components/CreateNovelModal";
import useMount from "@hooks/useMount";
// eslint-disable-next-line import/extensions
import bookImage from "public/book.png";
import useStoryStore, {Story} from "@/store/storyStore";
import Button from "@/components/atoms/Button";

function StoryItem({story}: {story: Story}) {
  const {id, title, description} = story;
  const router = useRouter();

  const goNovelPage = async () => {
    await router.push(`/${id}`);
  };

  return (
    <div
      className="flex h-40 w-full cursor-pointer items-center justify-center border border-[#e8e8e6] p-4"
      onClick={goNovelPage}
    >
      <div className="flex h-36 w-full items-center justify-center">
        <div className="aspect-square w-40 bg-[#F2F2F0]">
          {story.thumbnail && (
            <img src={story.thumbnail.src} alt={story.thumbnail.name} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="h-full w-full p-2">
          <h3 className="mb-4 text-3xl">{title}</h3>
          {description && <p className="text-[14px]">{description}</p>}
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
        <Button theme="none" onClick={openModal}>
          작품 추가
        </Button>
      }
    >
      <div className="relative mx-auto max-w-[1024px]">
        <div className="my-6 flex w-full flex-col items-center justify-center gap-5 px-4">
          <h2 className="flex flex-col items-center justify-center gap-2 py-5 text-2xl">
            <img src={bookImage.src} alt="" className="h-10 w-10" />
            작가님의 작품 목록
          </h2>
        </div>

        <div className="flex w-full flex-col gap-4">
          {mounted && stories.map((story) => <StoryItem story={story} key={`story-${story.id}`} />)}
        </div>
      </div>

      <CreateNovelModal isOpen={isOpen} onCancel={closeModal} onConfirm={makeNewStory} />
    </Layout>
  );
}
