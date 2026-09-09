import "./EpaLogo.css";

type Props = {
  variant?: "mark" | "lockup";
  className?: string;
};

export default function EpaLogo({ variant = "mark", className = "" }: Props) {
  return (
    <span className={`epa-logo epa-logo--${variant} ${className}`}>
      <img src="/logo-nobg.png" alt="Elite Player Academy" />
    </span>
  );
}
