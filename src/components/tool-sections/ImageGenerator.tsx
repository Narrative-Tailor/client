import Button from "@components/atoms/Button";
import {useInput} from "@/hooks";
import ResetButton from "./ResetButton";

export default function ImageGenerator() {
  const {onChangeValue, value} = useInput();
  const resetImage = () => {};
  const generateImage = () => {};
  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <div className="mt-2 flex items-center justify-between p-2">
        <h4 className="text-xl">묘사 이미지 생성</h4>
        <ResetButton onClick={resetImage} />
      </div>
      <div className="flex flex-col gap-4 px-2">
        <textarea
          className="h-60 w-full p-1"
          placeholder="생성하고 싶은 이미지를 묘사해주세요!"
          value={value}
          onChange={onChangeValue}
        />
        <Button onClick={generateImage}>이미지 생성하기</Button>
      </div>
    </div>
  );
}
