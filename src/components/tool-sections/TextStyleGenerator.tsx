import Button from "@components/atoms/Button";
import {useState} from "react";
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

  const handleTransformTextStyle = () => {
    switch (selectedOption?.value) {
      case "사극체":
        setTransformedText("어쩌시겠습니까?");
        break;
      case "잼민이체":
        setTransformedText("어쩔티비~");
        break;
      default:
        break;
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
        <div className="flex flex-col gap-4">
          <textarea className="h-52 overflow-auto p-1" value={textStyleValue} onChange={onChangeTextStyleValue} />

          <Button onClick={handleTransformTextStyle}>변환하기</Button>
          {transformedText && (
            <div className="h-44 overflow-auto border border-black p-1">
              <p>{transformedText}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
