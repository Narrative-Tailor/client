import {ChangeEvent} from "react";

type LabelStyle = "horizontal" | "vertical";

export interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
  labelStyle?: LabelStyle;
  textareaMode?: boolean;
}

export default function Input({value, onChange, label, labelStyle = "vertical", textareaMode = false}: InputProps) {
  // eslint-disable-next-line no-nested-ternary
  const containerStyle = `flex ${labelStyle === "vertical" ? "flex-col" : textareaMode ? "" : "items-center"}`;
  return (
    <div className={containerStyle}>
      {label && (
        <label htmlFor={`${label}-input`} className="mr-2 min-w-[72px] text-[16px]">
          {label}
        </label>
      )}
      {textareaMode ? (
        <textarea
          id={`${label}-input`}
          className="h-32 w-full resize-none rounded-[5px] p-1"
          value={value}
          onChange={onChange}
        />
      ) : (
        <input id={`${label}-input`} className="w-full rounded-[5px] p-1" value={value} onChange={onChange} />
      )}
    </div>
  );
}
