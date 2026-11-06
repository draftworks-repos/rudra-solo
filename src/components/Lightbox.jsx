import React, { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useBooking } from "../context/BookingContext.jsx";
import CtaButton from "./CtaButton.jsx";
import "./Lightbox.css";

export default function Lightbox({ item, items, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (item && !dialog.open) {
      dialog.showModal();
    } else if (!item && dialog.open) {
      dialog.close();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[nextIdx]);
  };
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onNavigate(items[nextIdx]);
  };

  const handleBookSimilar = () => {
    onClose();
    openBooking({
      source: `Gallery: ${item.title}`,
      style: item.style,
      placement: item.placement,
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      onClose={onClose}
      aria-label="Tattoo piece lightbox preview"
    >
      <div className="lightbox__shell">
        {/* Close Button */}
        <button
          type="button"
          className="lightbox__close-btn"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Navigation Buttons */}
        <button
          type="button"
          className="lightbox__nav-btn lightbox__nav-btn--prev"
          onClick={handlePrev}
          aria-label="Previous artwork"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          type="button"
          className="lightbox__nav-btn lightbox__nav-btn--next"
          onClick={handleNext}
          aria-label="Next artwork"
        >
          <ChevronRight size={28} />
        </button>

        {/* Media Frame - full brightness contain */}
        <div className="lightbox__media">
          <img
            src={item.image.src}
            alt={item.image.alt}
            className="lightbox__img"
            style={{ objectPosition: item.image.position }}
          />
        </div>

        {/* Caption & Booking bar */}
        <div className="lightbox__caption-bar">
          <div className="lightbox__info-chip">
            <h3 className="lightbox__title">{item.title}</h3>
            <div className="lightbox__tags">
              <span className="lightbox__tag">{item.style}</span>
              <span className="lightbox__tag-dot">•</span>
              <span className="lightbox__tag">{item.placement}</span>
              {item.status && (
                <>
                  <span className="lightbox__tag-dot">•</span>
                  <span className="lightbox__tag">{item.status}</span>
                </>
              )}
            </div>
          </div>

          <CtaButton
            variant="primary"
            size="md"
            onClick={handleBookSimilar}
          >
            <span>Book something like this</span>
            <ArrowUpRight size={16} />
          </CtaButton>
        </div>
      </div>
    </dialog>
  );
}
