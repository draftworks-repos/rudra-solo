import React from "react";
import ImageTile from "./ImageTile.jsx";
import "./GalleryTile.css";

export default function GalleryTile({ item, onSelect }) {
  const { image, title, style, aspect, status } = item;

  return (
    <div
      className="gallery-tile"
      onClick={() => onSelect(item)}
      role="button"
      tabIndex="0"
      aria-label={`View ${title} (${style}) in detail`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(item);
        }
      }}
    >
      <ImageTile
        src={image.src}
        alt={image.alt}
        position={image.position}
        aspect={aspect}
        className="gallery-tile__img-wrap"
      />

      {/* Solid chip for text - never raw text on image */}
      <div className="gallery-tile__chip">
        <span className="gallery-tile__style">{style}</span>
        {status && <span className="gallery-tile__status">{status}</span>}
      </div>
    </div>
  );
}
