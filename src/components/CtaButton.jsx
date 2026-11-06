import React from "react";
import "./CtaButton.css";

export default function CtaButton({
  children,
  variant = "primary", // primary (acid), secondary (bone), dark (ink bg), outline
  size = "md", // sm, md, lg
  onClick,
  href,
  className = "",
  type = "button",
  disabled = false,
  target,
  rel,
  ariaLabel,
}) {
  const rootClasses = `cta-button cta-button--${variant} cta-button--${size} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={rootClasses}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        <span className="cta-button__inner">{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      className={rootClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className="cta-button__inner">{children}</span>
    </button>
  );
}
