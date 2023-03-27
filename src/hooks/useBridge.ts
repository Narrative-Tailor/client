import {useState} from "react";
import useInput from "./useInput";

const useBridge = () => {
  const [bridgeParagraph, setBridgeParagraph] = useState("");

  const {value: preParagraph, onChangeValue: onChangePreParagraph, setValue: setPre} = useInput();
  const {value: postParagraph, onChangeValue: onChangePostParagraph, setValue: setPost} = useInput();

  const resetBridge = () => {
    setBridgeParagraph("");
    setPre("");
    setPost("");
  };

  const getBridge = async (pre: string, post: string) => {
    return Promise.resolve(`${pre} + ${post}`);
  };
  const handleBridgeParagraph = async () => {
    const trimedPre = preParagraph.trim();
    const trimedPost = postParagraph.trim();
    if (!trimedPre || !trimedPost) {
      alert("문단을 모두 입력해주세요");
      return;
    }
    const bridged = await getBridge(trimedPre, trimedPost);

    setBridgeParagraph(bridged);
  };

  return {
    bridgeParagraph,
    preParagraph,
    postParagraph,
    onChangePreParagraph,
    onChangePostParagraph,
    resetBridge,
    handleBridgeParagraph,
  };
};
export default useBridge;
