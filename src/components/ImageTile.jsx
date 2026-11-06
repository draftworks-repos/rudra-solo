import React, { useState } from "react";
import "./ImageTile.css";

export default function ImageTile({
  src,
  alt,
  position = "50% 50%",
  aspect = "4/5",
  priority = false,
  className = "",
  contain = false,
  width,
  height,
  onClick,
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`image-tile ${contain ? "image-tile--contain" : ""} ${hasError ? "image-tile--error" : ""} ${className}`}
      style={{
        aspectRatio: aspect,
        width: width || "100%",
        height: height || "auto",
      }}
      onClick={onClick}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className={`image-tile__img ${isLoaded ? "is-loaded" : ""}`}
          style={{ objectPosition: position }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="image-tile__fallback" role="img" aria-label={alt}>
          <div className="image-tile__fallback-badge">INK</div>
          <span className="image-tile__fallback-text">{alt}</span>
        </div>
      )}
    </div>
  );
}
