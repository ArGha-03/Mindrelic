import type { ReactElement } from "react";
import { SpinnerIcon } from "../icons/SpinnerIcon";

interface ButtonProps {
  variant?: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantStyles = {
  default:
    "cursor-pointer rounded-md flex items-center justify-center font-semibold py-2.5 px-5 transition duration-150 ease-in focus:outline-none ",
  primary:
    "bg-blue-700 text-blue-100 hover:bg-[#5046e4] disabled:opacity-50",
  secondary:
    "bg-blue-200 text-blue-600 border border-blue-300 hover:bg-blue-300 hover:text-blue-800",
};

export const Button = ({
  variant = "primary",
  startIcon,
  text,
  onClick,
  fullWidth,
  loading,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      aria-busy={loading}
      className={`
        ${variantStyles[variant]}
        ${variantStyles.default}
        ${fullWidth ? "w-full" : ""}
        ${loading ? "opacity-60 cursor-not-allowed" : ""}
      `}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <SpinnerIcon/>
      ) :
      startIcon && <span className="mr-2">{startIcon}</span>}
      <span>{text}</span>
    </button>
  );
};
