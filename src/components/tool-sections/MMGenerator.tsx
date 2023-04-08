import {useState} from "react";

import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import ChipButton from "@components/atoms/Chip/ChipButton";
import {AxiosError} from "axios";
import ResetButton from "./ResetButton";

import {useInput} from "@/hooks";
import {getMindMap} from "@/api/getMindMap";

export default function MMGenerator() {
  const [mm, setMM] = useState<string[] | null>(null);
  const {value: topic, onChangeValue: onChangeTopic} = useInput();
  const {value: genre, onChangeValue: onChangeGenre} = useInput();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const handleReset = () => {
    setMM(null);
    setError(null);
  };

  const generateMM = async () => {
    if (!topic || !genre) {
      alert("토픽과 장르를 입력해주세요");
      return;
    }

    setIsLoading(true);
    setMM(null);
    setError(null);

    try {
      const data = {topic, genre, num: "10"};
      const words = await getMindMap(data);
      setError(null);
      setMM(words);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 overflow-y-auto px-4">
      <div className="mt-2 flex items-center justify-between p-2">
        <h4 className="text-lg">연상 단어 생성</h4>
        <ResetButton onClick={handleReset} />
      </div>
      <div className="flex flex-col gap-4 px-2">
        <Input value={topic} onChange={onChangeTopic} label="Topic" />
        <Input value={genre} onChange={onChangeGenre} label="장르" />

        {mm !== null && mm.length > 0 && (
          <div className="mt-2 flex w-full flex-wrap items-center justify-start gap-2">
            {mm.map((word, idx) => (
              <ChipButton
                key={`${word}-${idx + 1}`}
                disabled
                label={word}
                isSelected={false}
                onClick={() => {}}
                className="h-10 min-w-[calc(33%-5px)] break-words text-[14px] text-gray-800"
              />
            ))}
          </div>
        )}
        {mm !== null && mm.length === 0 && <p>생성된 단어가 없습니다.</p>}
        {mm === null && (
          <Button onClick={generateMM} disabled={isLoading}>
            생성하기
          </Button>
        )}
        {isLoading && <p>연상 단어를 생성중입니다.</p>}
        {error && <p className="text-red-500">에러가 발생했습니다.</p>}
      </div>
    </div>
  );
}
