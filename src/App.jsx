import React from "react";
import { BookingProvider } from "./context/BookingContext.jsx";
import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar.jsx";
import Marquee from "./components/Marquee.jsx";
import StickyCta from "./components/StickyCta.jsx";
import BookingModal from "./components/BookingModal.jsx";

// Sections
import HeroSection from "./sections/HeroSection.jsx";
import ReelsSection from "./sections/ReelsSection.jsx";
import GallerySection from "./sections/GallerySection.jsx";
import FlashSection from "./sections/FlashSection.jsx";
import HealedSection from "./sections/HealedSection.jsx";
import ArtistSection from "./sections/ArtistSection.jsx";
import StylesSection from "./sections/StylesSection.jsx";
import PricingSection from "./sections/PricingSection.jsx";
import AftercareSection from "./sections/AftercareSection.jsx";
import ReviewsSection from "./sections/ReviewsSection.jsx";
import InstagramSection from "./sections/InstagramSection.jsx";
import FooterSection from "./sections/FooterSection.jsx";

import "./App.css";

export default function App() {
  return (
    <BookingProvider>
      {/* Accessible skip link */}
      <a href="#work" className="skip-link">
        Skip to tattoo gallery
      </a>

      {/* Intro needle loader (~1.3s, once per session) */}
      <Loader />

      {/* Header & Navigation */}
      <Navbar />

      {/* Main Sections in strict rhythm */}
      <main id="main-content">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Marquee */}
        <Marquee />

        {/* 3. Reels */}
        <ReelsSection />

        {/* 4. Work Gallery */}
        <GallerySection />

        {/* 5. Flash Wall */}
        <FlashSection />

        {/* 6. Healed vs Fresh */}
        <HealedSection />

        {/* 7. The Artist */}
        <ArtistSection />

        {/* 8. Styles */}
        <StylesSection />

        {/* 9. Pricing & Scale */}
        <PricingSection />

        {/* 10. Aftercare */}
        <AftercareSection />

        {/* 11. Reviews */}
        <ReviewsSection />

        {/* 12. Instagram Feed */}
        <InstagramSection />
      </main>

      {/* 13. Footer / Final Call */}
      <FooterSection />

      {/* Persistent Mobile & Tablet Sticky Pill */}
      <StickyCta />

      {/* Native Dialog Booking Modal */}
      <BookingModal />
    </BookingProvider>
  );
}
