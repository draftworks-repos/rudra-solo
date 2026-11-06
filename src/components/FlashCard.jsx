import React from "react";
import { useBooking } from "../context/BookingContext.jsx";
import ImageTile from "./ImageTile.jsx";
import CtaButton from "./CtaButton.jsx";
import "./FlashCard.css";

export default function FlashCard({ flashItem }) {
  const { openBooking } = useBooking();
  const { name, inches, priceInr, sold, image, rotation = 0 } = flashItem;

  const handleBook = () => {
    openBooking({
      source: "Flash Wall",
      design: name,
      size: inches,
      budget: priceInr,
      style: "Fine Line",
    });
  };

  return (
    <article
      className={`flash-card ${sold ? "flash-card--sold" : ""}`}
      style={{ "--card-rot": `${rotation}deg` }}
    >
      {/* Stamp */}
      {sold ? (
        <div className="flash-card__sold-overlay" aria-label="Sold design">
          <span className="flash-card__sold-stamp">CLAIMED / SOLD</span>
        </div>
      ) : (
        <div className="flash-card__avail-stamp">AVAILABLE</div>
      )}

      {/* Artwork container */}
      <div className="flash-card__art-wrap">
        <ImageTile
          src={image.src}
          alt={image.alt}
          position={image.position}
          aspect="1/1"
          contain={true}
          className="flash-card__image"
        />
      </div>

      {/* Meta */}
      <div className="flash-card__content">
        <div className="flash-card__row">
          <h3 className="flash-card__name">{name}</h3>
          <span className="flash-card__size">{inches}&Prime; longest</span>
        </div>

        <div className="flash-card__bottom">
          <div className="flash-card__price">
            <span className="flash-card__currency">₹</span>
            <span className="flash-card__amount">
              {priceInr.toLocaleString("en-IN")}
            </span>
          </div>

          <CtaButton
            variant="primary"
            size="sm"
            disabled={sold}
            onClick={handleBook}
            ariaLabel={sold ? `${name} is sold` : `Book ${name} design`}
          >
            {sold ? "CLAIMED" : "BOOK THIS"}
          </CtaButton>
        </div>
      </div>
    </article>
  );
}
