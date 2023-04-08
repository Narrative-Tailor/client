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
      alert("이미지 묘사를 입력해주세요");
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
        <h4 className="text-xl">묘사 이미지 생성</h4>
        <ResetButton onClick={resetImage} />
      </div>
      <div className="flex flex-col gap-2 px-2">
        <textarea
          className="h-60 w-full p-1"
          placeholder="생성하고 싶은 이미지를 묘사해주세요!"
          value={value}
          onChange={onChangeValue}
        />
        <Button onClick={generateImage} disabled={isLoading}>
          이미지 생성하기
        </Button>
        {isLoading && <p>이미지를 생성중입니다.</p>}
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
      {!isLoading && image && (
        <div className="flex flex-col gap-4 px-2">
          <img className="aspect-auto w-full" src={image} alt="묘사 이미지" />
        </div>
      )}
    </div>
  );
}
