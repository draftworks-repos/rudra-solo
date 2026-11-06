import React from "react";
import { useInView } from "../hooks/useInView.js";
import "./Reveal.css";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Component = "div",
}) {
  const [ref, isInView] = useInView();

  return (
    <Component
      ref={ref}
      className={`reveal ${isInView ? "is-in" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
