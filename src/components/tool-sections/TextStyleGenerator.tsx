import Button from "@components/atoms/Button";
import {useState} from "react";
import {AxiosError} from "axios";
import {useInput, useOptions} from "@/hooks";
import ResetButton from "./ResetButton";
import {transformStyle} from "@/api/transformTextStyle";
import {TextStyle} from "@/models/textStyle";

export default function TextStyleGenerator({textStyles, loading}: {textStyles: TextStyle[]; loading: boolean}) {
  const options = textStyles
    .filter((textStyle) => textStyle.isAvailable)
    .map((textStyle) => ({label: textStyle.value, value: textStyle.value}));

  const {handleChangeOption, selectedOption} = useOptions(options, options[0]);

  const {value: textStyleValue, onChangeValue: onChangeTextStyleValue} = useInput();
  const [transformedText, setTransformedText] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const handleTransformTextStyle = async () => {
    if (!selectedOption || options.length === 0) {
      return;
    }
    if (!textStyleValue) {
      alert("변환할 문장을 입력해주세요.");
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await transformStyle({
        style: selectedOption.label,
        text: textStyleValue,
      });
      setTransformedText(
        result.result
          .replaceAll(/변환 후:/gi, "")
          .replaceAll(/"/gi, "")
          .split("\n"),
      );
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const resetTransformedText = () => {
    setTransformedText([]);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <div className="mt-2 flex items-center justify-between p-2">
        <h4 className="text-lg">문체 변환</h4>
        <ResetButton onClick={resetTransformedText} />
      </div>
      {!loading && (
        <section className="flex flex-col gap-10 px-2">
          <select
            className="rounded-[5px] border border-[#E8E8E6] p-2 text-[14px]"
            value={selectedOption?.value}
            onChange={handleChangeOption}
          >
            {options.map((option) => (
              <option key={option.label} value={option.value} className="p-1 text-[14px]">
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex w-full flex-col">
            <textarea className="h-52 resize-none" value={textStyleValue} onChange={onChangeTextStyleValue} />
          </div>
          <div className="w-full">
            {transformedText.length === 0 && (
              <Button onClick={handleTransformTextStyle} disabled={isLoading} size="full">
                변환하기
              </Button>
            )}
            {isLoading && <p>문체를 변환중입니다.</p>}
            {error && <p className="text-red-500">문체 변환중 에러가 발생하였습니다.</p>}
            {transformedText.length > 0 && (
              <div className="flex h-auto min-h-[200px] flex-col overflow-auto">
                <h4 className="mb-4">문체 변환 결과</h4>
                <div className="flex flex-1 flex-col gap-4 rounded-[5px] py-1">
                  {transformedText.map((text) => (
                    <p className="border border-[#E8E8E6] bg-white">{text}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
