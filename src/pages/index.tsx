import {useState} from "react";
import {Novel} from "@models/novel";
import {mockNovels} from "@constants/novels";
import {useRouter} from "next/router";
import Layout from "@/components/layouts/HomeLayout";
import CreateNovelModal, {useCreateNovelModal} from "@/components/CreateNovelModal";

function NovelItem({id, title, description}: Novel) {
  const router = useRouter();

  const goNovelPage = async () => {
    await router.push(`/${id}`);
  };

  return (
    <article className="flex h-28 w-full items-center justify-center" onClick={goNovelPage}>
      <div className="flex h-28 w-full items-center justify-center">
        <div className="aspect-square w-28 bg-yellow-200" />
        <div className="h-full w-full p-2">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-sm">{description}</p>}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [items] = useState<Novel[]>(mockNovels);
  const {isOpen, openModal, closeModal} = useCreateNovelModal();

  return (
    <Layout>
      <div className="mx-auto max-w-[1024px]">
        <h1 className="mt-2 mb-4 text-center text-4xl">바른자세로 앉아 계신가요?</h1>
        <div>
          <section className="w-full">
            <ul>
              {items.map(({id, title, description}) => (
                <li key={`item-${id}`}>
                  <NovelItem id={id} title={title} description={description} />
                </li>
              ))}
            </ul>
          </section>
          <button className="h-28 w-full bg-yellow-400" onClick={openModal}>
            <span className="text-3xl font-medium">+</span>
          </button>
        </div>
      </div>
      <CreateNovelModal isOpen={isOpen} onCancel={closeModal} onConfirm={closeModal} />
    </Layout>
  );
}
