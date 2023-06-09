import Button from "@components/atoms/Button";
import {AxiosError} from "axios";
import {useState} from "react";
import {useInput} from "@/hooks";
import ResetButton from "./ResetButton";
import {getImage} from "@/api/getImage";

export default function ImageGenerator() {
  const {onChangeValue, value, setValue} = useInput();
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const resetImage = () => {
    setError(null);
    setImage("");
    setValue("");
  };
  const generateImage = async () => {
    if (!value) {
      alert("그림 묘사를 입력해주세요");
      return;
    }
    setIsLoading(true);
    setImage("");
    setError(null);

    try {
      const data = {text: value};
      const {src} = await getImage(data);
      setError(null);
      setImage(src);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <div className="mt-2 flex items-center justify-between p-2">
        <h4 className="text-lg">그림 생성</h4>
        <ResetButton onClick={resetImage} />
      </div>
      <div className="flex flex-col gap-8 px-2">
        <textarea
          className="h-60 w-full resize-none"
          placeholder="생성하고 싶은 그림을 묘사해주세요!"
          value={value}
          onChange={onChangeValue}
        />
        <div className="w-full">
          <Button onClick={generateImage} disabled={isLoading} size="full">
            그림 생성하기
          </Button>
          {isLoading && <p>그림을 생성중입니다.</p>}
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      </div>
      {!isLoading && image && (
        <div className="flex flex-col gap-4 px-2">
          <h4>생성된 이미지</h4>
          <img className="aspect-auto w-full" src={image} alt="묘사 이미지" />
        </div>
      )}
    </div>
  );
}
