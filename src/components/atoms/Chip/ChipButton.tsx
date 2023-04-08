const SELECTED_STYLE = "bg-[#585856] text-gray-200";
const NOT_SELECTED_STYLE = "bg-white text-gray-500";
const DISABLED_STYLE = "bg-gray-400 text-white";
const DEFAULT_STYLE = "text-[14px] px-[10px] rounded-[10px] hover:opacity-80 whitespace-nowrap";

export interface ChipButtonProps {
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
}

export default function ChipButton({onClick, label, isSelected, disabled = false, className = ""}: ChipButtonProps) {
  let chipStyle = className;
  if (disabled) chipStyle = chipStyle.concat(` ${DISABLED_STYLE}`);

  if (isSelected) chipStyle = chipStyle.concat(` ${SELECTED_STYLE}`);
  else chipStyle = chipStyle.concat(` ${NOT_SELECTED_STYLE}`);

  chipStyle = chipStyle.concat(` ${DEFAULT_STYLE}`);
  // chipStyle = chipStyle.concat(` ${sizeStyles.auto}`);

  return (
    <button onClick={onClick} className={chipStyle} disabled={disabled}>
      {label}
    </button>
  );
}
