import Input from "@components/atoms/Input";
import {useState} from "react";
import Button from "@components/atoms/Button";
import {AxiosError} from "axios";
import {useInput} from "@/hooks";
import ResetButton from "./ResetButton";
import {getEpisode} from "@/api/getEpisode";

const parseEpisode = (episode: string) => {
  return episode.split("\n");
};
export default function EpisodeGenerator() {
  const [folded, setFolded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [episode, setEpisode] = useState<string[]>([]);

  const [generated, setGenerated] = useState(false);
  const {value: genre, onChangeValue: onChangeGenre, setValue: setGenre} = useInput();
  const {value: when, onChangeValue: onChangeWhen, setValue: setWhen} = useInput();
  const {value: where, onChangeValue: onChangeWhere, setValue: setWhere} = useInput();
  const {value: who, onChangeValue: onChangeWho, setValue: setWho} = useInput();
  const {value: what, onChangeValue: onChangeWhat, setValue: setWhat} = useInput();
  const {value: how, onChangeValue: onChangeHow, setValue: setHow} = useInput();
  const {value: why, onChangeValue: onChangeWhy, setValue: setWhy} = useInput();

  const toggleFold = () => {
    setFolded((prev) => !prev);
  };

  const handleReset = () => {
    setGenerated(false);
    setError(null);
    setIsLoading(false);
    setEpisode([]);
    setGenre("");
    setWhen("");
    setWhere("");
    setWho("");
    setWhat("");
    setHow("");
    setWhy("");
    setFolded(false);
  };

  const handleGenerate = async () => {
    if (!genre.trim() || !when.trim() || !where.trim() || !who.trim() || !what.trim() || !how.trim() || !why.trim()) {
      alert("모든 입력을 확인해주세요");
      return;
    }

    setEpisode([]);
    setIsLoading(true);

    try {
      const {result} = await getEpisode({genre, how, what, when, where, who, why});
      setFolded(true);
      setGenerated(true);
      setEpisode(parseEpisode(result));
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <div className="flex items-center justify-end gap-2 p-2">
        <h4 className="flex-1 text-lg">에피소드 생성</h4>
        <Button onClick={toggleFold} theme="none">
          {folded ? "열기" : "접기"}
        </Button>
        <ResetButton onClick={handleReset} />
      </div>
      <section className="flex flex-col gap-8 px-2 pb-2">
        <div className="flex w-full flex-col gap-4 p-1">
          {!folded && (
            <>
              <Input value={genre} onChange={onChangeGenre} label="장르" labelStyle="horizontal" />
              <Input value={when} onChange={onChangeWhen} label="언제" labelStyle="horizontal" />
              <Input value={where} onChange={onChangeWhere} label="어디서" labelStyle="horizontal" />
              <Input value={who} onChange={onChangeWho} label="누구랑" labelStyle="horizontal" />
              <Input value={what} onChange={onChangeWhat} label="무엇을" labelStyle="horizontal" />
              <Input value={how} onChange={onChangeHow} label="어떻게" labelStyle="horizontal" textareaMode />
              <Input value={why} onChange={onChangeWhy} label="왜" labelStyle="horizontal" textareaMode />
            </>
          )}
        </div>
        <div className="flex w-full flex-col">
          {!generated && (
            <Button onClick={handleGenerate} disabled={isLoading}>
              생성하기
            </Button>
          )}
          {isLoading && <p>생성중...</p>}
          {error && (
            <p className="text-sm text-red-500">에피소드 생성 중 에러가 발생하였습니다. 잠시 후 다시 시도해주세요.</p>
          )}
        </div>
        {generated && (
          <div className="flex h-fit w-full flex-col gap-4 bg-white">
            <h4>에피소드</h4>
            <div className="border border-[#E8E8E6] p-4 leading-8">
              {episode.map((sentence, idx) => (
                <p key={`${idx + 1}`} className="py-1">
                  {sentence}
                </p>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
