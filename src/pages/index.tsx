import {useRouter} from "next/router";

import Layout from "@components/layouts/HomeLayout";
import CreateNovelModal, {useCreateNovelModal} from "@components/CreateNovelModal";
import useMount from "@hooks/useMount";
import useStoryStore, {Story} from "@/store/storyStore";

function StoryItem({story}: {story: Story}) {
  const {id, title, description} = story;
  const router = useRouter();

  const goNovelPage = async () => {
    await router.push(`/${id}`);
  };

  return (
    <div className="flex h-28 w-full cursor-pointer items-center justify-center" onClick={goNovelPage}>
      <div className="flex h-28 w-full items-center justify-center">
        <div className="aspect-square w-28 bg-yellow-200">
          {story.thumbnail && (
            <img src={story.thumbnail.src} alt={story.thumbnail.name} className="h-full w-full object-contain" />
          )}
        </div>
        <div className="h-full w-full p-2">
          <h3 className="text-lg font-medium">{title}</h3>
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
        <h1 className="mt-2 mb-4 text-center text-4xl">바른자세로 앉아 계신가요?</h1>
        <div>
          <div className="w-full">
            {mounted && stories.map((story) => <StoryItem story={story} key={`story-${story.id}`} />)}
          </div>
          <button className="h-28 w-full bg-yellow-400" onClick={openModal}>
            <span className="text-3xl font-medium">+</span>
          </button>
        </div>
      </div>
      <CreateNovelModal isOpen={isOpen} onCancel={closeModal} onConfirm={makeNewStory} />
    </Layout>
  );
}
