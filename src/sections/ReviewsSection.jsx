import React from "react";
import { reviews } from "../data/reviews.js";
import SectionHead from "../components/SectionHead.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import Reveal from "../components/Reveal.jsx";
import "./ReviewsSection.css";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="reviews-section cv-auto" aria-labelledby="reviews-title">
      <div className="container">
        <Reveal>
          <SectionHead
            number="09"
            label="09 / WORDS"
            title="SKIN IN THE GAME."
            highlightWord="GAME."
            isDark={false}
          />
        </Reveal>

        {/* 3 desktop, 2 tablet, 1 mobile masonry */}
        <div className="reviews-masonry">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
