import Modal from "react-modal";
import {useState} from "react";
import Button from "./atoms/Button";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

// eslint-disable-next-line
Modal.setAppElement("#__next");

export const useCreateNovelModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return {isOpen, openModal, closeModal};
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
    background: "#ffffe7",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "14px",
    outline: "none",
    zIndex: 10,
    position: "unset",
    width: "100%",
    height: "100%",
    maxWidth: "768px",
    maxHeight: "768px",
    // transform: 'translate(-50%, -50%)'
  },
} as const;

export default function CreateNovel({isOpen, onCancel, onConfirm}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      // onRequestClose={closeModal}
      style={styles}
      contentLabel="Example Modal"
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex-1" />
        <div className="flex items-center justify-center space-x-3">
          <Button onClick={onCancel} theme="secondary">
            취소
          </Button>
          <Button onClick={onConfirm}>확인</Button>
        </div>
      </div>
    </Modal>
  );
}
