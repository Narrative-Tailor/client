import {ReactNode} from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  theme?: "primary" | "secondary" | "none";
  size?: "full" | "lg" | "md" | "sm" | "default";
}

const classes = {
  primary: `rounded-[10px] bg-[#585856] min-w-[80px] px-4 py-2 text-white transition-opacity hover:opacity-70 disabled:bg-gray-300 disabled:text-gray-800 disabled:opacity-70`,
  secondary:
    "rounded-[10px] bg-gray-300 min-w-[80px] px-4 py-2 text-gray-900 transition-opacity hover:opacity-70 disabled:bg-gray-300 disabled:text-gray-800 disabled:opacity-70",
  none: "rounded-[10px] bg-none min-w-[80px] px-4 py-2 text-gray-900 transition-opacity hover:opacity-70 disabled:bg-gray-300 disabled:text-gray-800 disabled:opacity-70",
  size: {
    full: "w-full",
    lg: "w-36",
    md: "w-24",
    sm: "w-16",
    default: "",
  },
};

function Button({
  onClick,
  children,
  disabled = false,
  type = "button",
  theme = "primary",
  size = "default",
}: ButtonProps) {
  let buttonStyle = classes[theme];
  buttonStyle = buttonStyle.concat(` ${classes.size[size]}`);

  return (
    <button className={buttonStyle} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
export default Button;
