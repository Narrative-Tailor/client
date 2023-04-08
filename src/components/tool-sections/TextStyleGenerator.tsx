import Button from "@components/atoms/Button";
import {useState} from "react";
import {AxiosError} from "axios";
import {useInput, useOptions, useTextStyle} from "@/hooks";
import ResetButton from "./ResetButton";

const useTextStyleOptions = () => {
  const {data: textStyles} = useTextStyle();
  const options = textStyles
    .filter((textStyle) => textStyle.isAvailable)
    .map((textStyle) => ({label: textStyle.value, value: textStyle.value}));

  const defaultOptions = options.length > 0 ? options[0] : undefined;

  const {options: textStyleOptions, handleChangeOption, selectedOption} = useOptions(options, defaultOptions);

  return {
    options: textStyleOptions,
    selectedOption,
    handleChangeOption,
  };
};

export default function TextStyleGenerator() {
  const {options: textStyleOptions, handleChangeOption, selectedOption} = useTextStyleOptions();

  const {value: textStyleValue, onChangeValue: onChangeTextStyleValue} = useInput();
  const [transformedText, setTransformedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const handleTransformTextStyle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await new Promise<string>((res) => {
        setTimeout(() => {
          res("변환된 문장");
        }, 2000);
      });

      setTransformedText(result);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const resetTransformedText = () => {
    setTransformedText("");
  };

  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <div className="mt-2 flex items-center justify-between p-2">
        <h4 className="text-xl">문체 변환</h4>
        <ResetButton onClick={resetTransformedText} />
      </div>
      <section className="flex flex-col gap-4 px-2">
        <select className="py-1" value={selectedOption?.value} onChange={handleChangeOption}>
          {textStyleOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-2">
          <textarea
            className="h-52 resize-none overflow-auto p-1"
            value={textStyleValue}
            onChange={onChangeTextStyleValue}
          />

          {!transformedText && <Button onClick={handleTransformTextStyle}>변환하기</Button>}
          {isLoading && <p>문체를 변환중입니다.</p>}
          {error && <p className="text-red-500">문체 변환중 에러가 발생하였습니다.</p>}
          {transformedText && (
            <div className="flex h-auto min-h-[200px] flex-col overflow-auto">
              <h4 className="mb-4">문체 변환 결과</h4>
              <p className=" flex-1 bg-white px-2 py-1">{transformedText}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
