import {Typo} from "hanspell";
import {useState} from "react";
import axios, {AxiosError} from "axios";
import {useInput} from "@/hooks";
import Button from "../atoms/Button";

export default function SpellChecker() {
  const {value: sentenceToCheck, onChangeValue: onChangeSentenceToCheck} = useInput();
  const [checkedResult, setCheckedResult] = useState<Typo[] | null>(null);
  const [checkedSentence, setCheckedSentence] = useState("");
  const [showCheckedResult, setShowCheckedResult] = useState(false);

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-y-auto px-2">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => {
            setCheckedResult(null);
            setCheckedSentence("");
            setShowCheckedResult(false);
          }}
        >
          초기화
        </button>
      </div>
      <div className="flex w-full flex-col items-center">
        <h4 className="mb-2 w-full">검사할 문장</h4>
        <textarea
          name="check-sentence"
          className="h-36 w-full p-1"
          value={sentenceToCheck}
          onChange={onChangeSentenceToCheck}
        />
      </div>
      {checkedResult === null ? (
        <Button
          onClick={async () => {
            try {
              const {data} = await axios.post<Typo[]>("/api/spell-check", {sentence: sentenceToCheck});
              // console.log(data);
              setCheckedResult(data);
              setCheckedSentence(sentenceToCheck);
            } catch (error: unknown) {
              console.error(error as AxiosError);
            }
          }}
        >
          맞춤법 검사
        </Button>
      ) : (
        <div className="flex w-full flex-col items-center">
          <h4 className="mb-1 w-full">검사 결과</h4>
          <ul>
            {checkedResult.map((result) => (
              <li className="mb-4 flex flex-col gap-1" key={result.token}>
                <p>
                  검사한 단어 : <span className="text-[16px] font-semibold">{result.token}</span>
                </p>
                <div className="flex">
                  <span className="mr-2 text-[14px] font-semibold">제안 단어 :</span>
                  {result.suggestions.map((suggestion, index) => (
                    <>
                      <span
                        className="cursor-pointer text-[14px] text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          if (!showCheckedResult) {
                            setShowCheckedResult(true);
                          }
                          setCheckedSentence((prevSentence) => {
                            return prevSentence.replaceAll(result.token, suggestion);
                          });
                        }}
                      >
                        {suggestion}
                      </span>
                      <span className="mr-1 text-[14px]">{index === result.suggestions.length - 1 ? "" : ","}</span>
                    </>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showCheckedResult && <textarea disabled value={checkedSentence} />}
    </div>
  );
}
