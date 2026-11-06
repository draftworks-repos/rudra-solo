import React from "react";
import { Star } from "lucide-react";
import GoogleG from "./GoogleG.jsx";
import "./ReviewCard.css";

export default function ReviewCard({ review }) {
  const { quote, author, rotation = 0 } = review;

  return (
    <article
      className="review-card"
      style={{ "--rev-rot": `${rotation}deg` }}
      aria-label={`5-star Google review from ${author}`}
    >
      {/* 5 filled gold-free ink stars */}
      <div className="review-card__stars" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className="review-card__star-icon"
            fill="currentColor"
            stroke="none"
          />
        ))}
      </div>

      {/* Quote in DM Sans 500 */}
      <p className="review-card__quote">&ldquo;{quote}&rdquo;</p>

      {/* Bottom row: Google G circle + reviewer name (DM Sans 700) */}
      <div className="review-card__author-row">
        <GoogleG size={18} />
        <span className="review-card__name">{author}</span>
      </div>
    </article>
  );
}
