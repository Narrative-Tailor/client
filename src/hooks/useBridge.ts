import {useState} from "react";
import {AxiosError} from "axios";
import useInput from "./useInput";
import {getContext} from "@/api/getContext";

const useBridge = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
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
    try {
      const {result} = await getContext({pre: trimedPre, post: trimedPost});
      setBridgeParagraph(result);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
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
