import {ReactNode} from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  theme?: "primary" | "secondary";
}

const classes = {
  primary:
    "bg-amber-500 min-w-[80px] px-4 py-2 text-white transition-opacity hover:opacity-70 disabled:bg-gray-300 disabled:text-gray-800 disabled:opacity-70",
  secondary:
    "bg-gray-300 min-w-[80px] px-4 py-2 text-gray-900 transition-opacity hover:opacity-70 disabled:bg-gray-300 disabled:text-gray-800 disabled:opacity-70",
};

function Button({onClick, children, disabled = false, type = "button", theme = "primary"}: ButtonProps) {
  const buttonStyle = theme === "primary" ? classes.primary : classes.secondary;

  return (
    <button className={buttonStyle} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
export default Button;
