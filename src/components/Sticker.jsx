import React from "react";
import "./Sticker.css";

export default function Sticker({
  children,
  variant = "acid", // acid, bone, hot, dark
  rotate = 0,
  className = "",
  size = "md",
}) {
  return (
    <div
      className={`sticker sticker--${variant} sticker--${size} ${className}`}
      style={{ "--rot": `${rotate}deg` }}
    >
      <span className="sticker__text">{children}</span>
    </div>
  );
}
