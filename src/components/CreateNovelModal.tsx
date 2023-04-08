import Modal from "react-modal";
import {useState} from "react";

import Button from "@components/atoms/Button";
import {useInput} from "@/hooks";
import useStoryStore from "@/store/storyStore";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (title: string, description: string, thumbnail?: File) => void;
};

// eslint-disable-next-line
Modal.setAppElement("#__next");

export const useCreateNovelModal = () => {
  const {addStory} = useStoryStore();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const makeNewStory = async (title: string, description: string, thumbnail?: File) => {
    addStory(title, description, thumbnail);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 250);
    });
    closeModal();
  };

  return {isOpen, openModal, closeModal, makeNewStory};
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0, 0.5)",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "5px",
    outline: "none",
    zIndex: 10,
    position: "unset",
    width: "100%",
    height: "fit-content",
    maxWidth: "768px",
    maxHeight: "510px",
    // transform: 'translate(-50%, -50%)'
  },
} as const;

export default function CreateNovel({isOpen, onCancel, onConfirm}: Props) {
  const {value: title, onChangeValue: onChangeTitle} = useInput();
  const {value: description, onChangeValue: onChangeDescription} = useInput();
  const [thumbnail, setThumbnail] = useState<File>();

  const handleChangeThumbnail = (files: FileList) => {
    if (files[0]) {
      setThumbnail(files[0]);
    }
  };
  const handleConfirm = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      alert("제목과 설명을 입력해주세요");
      return;
    }

    onConfirm(trimmedTitle, trimmedDescription, thumbnail);
  };

  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      // onRequestClose={closeModal}
      style={styles}
      contentLabel="Example Modal"
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex h-full w-full">
          <div className="h-full w-1/4">
            <div className="flex aspect-[3/4] w-full items-center justify-center bg-gray-100">
              <label
                className="flex h-full w-full cursor-pointer items-center justify-center"
                htmlFor="new-story-thumbnail"
              >
                {thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt={thumbnail.name}
                    style={{width: "100%", height: "100%", objectFit: "contain"}}
                  />
                ) : (
                  <span>썸네일 이미지</span>
                )}
              </label>
            </div>
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
          </div>
          <div className="flex-1">
            <div className="flex flex-col p-2">
              <label htmlFor="new-story-title-input" className="mb-1 text-lg font-semibold">
                제목
              </label>
              <input
                type="text"
                id="new-story-title-input"
                className="p-1 text-[14px]"
                value={title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="flex flex-col p-2">
              <label htmlFor="new-story-description" className="mb-1 text-lg font-semibold">
                설명
              </label>
              <textarea
                id="new-story-description"
                className="h-32 resize-none p-1 text-[14px]"
                value={description}
                onChange={onChangeDescription}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10">
          <Button onClick={onCancel} theme="none">
            취소
          </Button>
          <Button onClick={handleConfirm}>확인</Button>
        </div>
      </div>
    </Modal>
  );
}
