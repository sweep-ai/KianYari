import type { ButtonHTMLAttributes } from "react";
import "./ApplyButton.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
};

export default function ApplyButton({ children, variant = "solid", className = "", ...rest }: Props) {
  return (
    <button className={`apply-btn apply-btn--${variant} ${className}`} {...rest}>
      {children}
    </button>
  );
}
