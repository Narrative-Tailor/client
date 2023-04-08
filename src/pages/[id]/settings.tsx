import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import NovelLayout from "@/components/layouts/NovelLayout";
import Input from "@/components/atoms/Input";
import {useInput} from "@/hooks";
import useStoryStore, {Thumbnail} from "@/store/storyStore";
import Button from "@/components/atoms/Button";
import {getBase64} from "@/utils/base64";

export default function NovelSettings() {
  const router = useRouter();
  const {id} = router.query as {id: string};

  const {stories, editStory, deleteStory} = useStoryStore();
  const currentStory = stories.find(({id: storyId}) => storyId === parseInt(id, 10));

  const {value: title, onChangeValue: onChangeTitle, setValue: setTitle} = useInput();
  const {value: description, onChangeValue: onChangeDescription, setValue: setDescription} = useInput();
  const [preview, setPreview] = useState<Thumbnail>();
  const [thumbnail, setThumbnail] = useState<File>();

  const handleSave = async () => {
    if (!id) return;
    let newImage;
    if (thumbnail) {
      const min = 1;
      const max = 10000;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

      newImage = {
        src: await getBase64(thumbnail),
        name: `썸네일-${randomNumber}`,
      };
      setPreview(newImage);
    }

    editStory(parseInt(id, 10), title, description, newImage);
    alert("저장되었습니다.");
  };
  useEffect(() => {
    if (!currentStory) {
      router.replace("/");
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const {title, description, thumbnail} = {...currentStory};
    if (!title || !description) return;

    setTitle(title);
    setDescription(description);
    setPreview(thumbnail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStory]);

  const handleChangeThumbnail = (files: FileList) => {
    if (files[0]) {
      setThumbnail(files[0]);
    }
  };

  const handleDelete = () => {
    if (!id) return;

    if (window.confirm("정말로 작품을 삭제하시겠습니까? 작업은 취소할 수 없습니다.")) {
      deleteStory(parseInt(id, 10));
      alert("작품을 삭제했습니다.");
      router.replace("/");
    }
  };

  return (
    <NovelLayout id={id} hideSettings>
      <div className="mx-auto mt-5 w-full max-w-[600px] ">
        <div className="flex h-full w-full flex-col p-4">
          <div className="w-full pb-4">
            <label className="text-[16px]">작품 이미지</label>
            <div className="flex w-full items-center justify-center p-4">
              <div className="relative flex aspect-square w-2/3 items-center justify-center bg-[#F2F2F0]">
                {thumbnail && (
                  <>
                    <label
                      htmlFor="new-story-thumbnail"
                      className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center"
                    />
                    <img src={preview?.src} alt={preview?.name} className="h-full w-full object-cover" />
                    <input
                      type="file"
                      name=""
                      id="new-story-thumbnail"
                      className="invisible"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          handleChangeThumbnail(e.target.files);
                        }
                      }}
                    />
                  </>
                )}

                {!thumbnail && (
                  <>
                    <label
                      htmlFor="new-story-thumbnail"
                      className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center"
                    >
                      등록된 이미지가 없습니다.
                    </label>
                    <input
                      type="file"
                      name=""
                      id="new-story-thumbnail"
                      className="invisible"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          handleChangeThumbnail(e.target.files);
                        }
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full pb-4">
            <Input value={title} onChange={onChangeTitle} label="제목" labelStyle="horizontal" />
          </div>
          <div className="w-full pb-4">
            <Input
              value={description}
              onChange={onChangeDescription}
              label="내용"
              labelStyle="horizontal"
              textareaMode
            />
          </div>
        </div>
        <div
          className="flex h-20 w-full flex-col
        items-center gap-4"
        >
          <Button size="full" theme="primary" onClick={handleSave}>
            저장
          </Button>
          <button className="border-none text-[14px] text-red-400" onClick={handleDelete}>
            작품 삭제
          </button>
        </div>
      </div>
    </NovelLayout>
  );
}
