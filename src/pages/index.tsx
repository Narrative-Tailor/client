import {useRouter} from "next/router";

import Layout from "@components/layouts/HomeLayout";
import CreateNovelModal, {useCreateNovelModal} from "@components/CreateNovelModal";
import useMount from "@hooks/useMount";
import useStoryStore, {Story} from "@/store/storyStore";
import Button from "@/components/atoms/Button";

function StoryItem({story}: {story: Story}) {
  const {id, title, description} = story;
  const router = useRouter();

  const goNovelPage = async () => {
    await router.push(`/${id}`);
  };

  return (
    <div className="flex h-40 w-full cursor-pointer items-center justify-center p-4 shadow-sm" onClick={goNovelPage}>
      <div className="flex h-36 w-full items-center justify-center">
        <div className="aspect-square w-40 bg-[#F2F2F0]">
          {story.thumbnail && (
            <img src={story.thumbnail.src} alt={story.thumbnail.name} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="h-full w-full p-2">
          <h3 className="pb-2 text-lg font-medium">{title}</h3>
          {description && <p className="text-sm">{description}</p>}
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
    <Layout>
      <div className="mx-auto max-w-[1024px]">
        <div className="flex h-[80px] w-full items-center justify-end gap-2">
          {/* <Button theme="none" onClick={() => {}}>
            삭제
          </Button> */}
          <Button theme="primary" onClick={openModal}>
            작품 추가
          </Button>
        </div>
        <div>
          <div className="w-full">
            {mounted && stories.map((story) => <StoryItem story={story} key={`story-${story.id}`} />)}
          </div>
        </div>
      </div>
      <CreateNovelModal isOpen={isOpen} onCancel={closeModal} onConfirm={makeNewStory} />
    </Layout>
  );
}
