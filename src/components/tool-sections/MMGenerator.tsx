import {useState} from "react";

import Button from "@components/atoms/Button";
import Input from "@components/atoms/Input";
import ChipButton from "@components/atoms/Chip/ChipButton";
import ResetButton from "./ResetButton";

import {useInput} from "@/hooks";

export default function MMGenerator() {
  const [generated, setGenerated] = useState(false);
  const [mm, setMM] = useState<string[]>([]);
  const {value: topic, onChangeValue: onChangeTopic} = useInput();
  const {value: genre, onChangeValue: onChangeGenre} = useInput();

  const handleReset = () => {
    setGenerated(false);
  };
  const generateMM = () => {
    setMM(["나무", "바위", "번개", "피카츄", "낚시", "바위", "번개", "피카츄"]);
    setGenerated(true);
  };

  return (
    <div className="flex w-full flex-col gap-2 overflow-y-auto px-4">
      <div className="mt-2 flex items-center justify-between p-2">
        <h4 className="text-xl">연상 단어 생성</h4>
        <ResetButton onClick={handleReset} />
      </div>
      <div className="flex flex-col gap-4 px-2">
        <Input value={topic} onChange={onChangeTopic} label="Topic" />
        <Input value={genre} onChange={onChangeGenre} label="장르" />

        {generated && mm.length > 0 && (
          <div className="mt-2 flex w-full flex-wrap items-center justify-start gap-2">
            {mm.map((word, idx) => (
              <ChipButton
                key={`${word}-${idx + 1}`}
                disabled
                label={word}
                isSelected={false}
                onClick={() => {}}
                className="h-10 w-[96px] break-words text-[14px]"
              />
            ))}
          </div>
        )}
        {generated && mm.length === 0 && <p>생성된 단어가 없습니다.</p>}
        {!generated && <Button onClick={generateMM}>생성하기</Button>}
      </div>
    </div>
  );
}
