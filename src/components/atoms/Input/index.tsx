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
  const containerStyle = `flex gap-2 ${labelStyle === "vertical" ? "flex-col" : ""}`;
  return (
    <div className={containerStyle}>
      {label && (
        <label htmlFor={`${label}-input`} className="min-w-[88px] text-lg">
          {label}
        </label>
      )}
      {textareaMode ? (
        <textarea id={`${label}-input`} className="h-32 w-full resize-none p-1" value={value} onChange={onChange} />
      ) : (
        <input id={`${label}-input`} className="w-full p-1" value={value} onChange={onChange} />
      )}
    </div>
  );
}
