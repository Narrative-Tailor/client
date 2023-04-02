import {useState} from "react";
import useInput from "./useInput";
import {getContext} from "@/api/getContext";

const useBridge = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bridgeParagraph, setBridgeParagraph] = useState("");

  const {value: preParagraph, onChangeValue: onChangePreParagraph, setValue: setPre} = useInput();
  const {value: postParagraph, onChangeValue: onChangePostParagraph, setValue: setPost} = useInput();

  const resetBridge = () => {
    setBridgeParagraph("");
    setPre("");
    setPost("");
  };

  const handleBridgeParagraph = async () => {
    const trimedPre = preParagraph.trim();
    const trimedPost = postParagraph.trim();
    if (!trimedPre || !trimedPost) {
      alert("문단을 모두 입력해주세요");
      return;
    }
    setIsLoading(true);
    const {result} = await getContext({pre: trimedPre, post: trimedPost});
    setIsLoading(false);
    setBridgeParagraph(result);
  };

  return {
    isLoading,
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
