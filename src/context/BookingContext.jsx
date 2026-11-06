import React, { createContext, useContext, useState, useCallback } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    source: "General CTA",
    design: "",
    style: "Fine Line",
    size: 3,
    budget: "",
    placement: "Forearm",
  });

  const openBooking = useCallback((prefill = {}) => {
    setBookingData((prev) => ({
      ...prev,
      source: prefill.source || "Website CTA",
      design: prefill.design || "",
      style: prefill.style || prev.style || "Fine Line",
      size: prefill.size !== undefined ? prefill.size : prev.size || 3,
      budget: prefill.budget !== undefined ? prefill.budget : prev.budget || "",
      placement: prefill.placement || prev.placement || "Forearm",
    }));
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, bookingData, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
