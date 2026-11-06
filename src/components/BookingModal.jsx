import React, { useState, useEffect, useRef } from "react";
import { X, Send, Check, Copy, MessageCircle, ExternalLink } from "lucide-react";
import { useBooking } from "../context/BookingContext.jsx";
import { site } from "../data/site.js";
import { validateBookingForm, buildMailtoUrl, buildWhatsAppUrl } from "../utils/validation.js";
import CtaButton from "./CtaButton.jsx";
import "./BookingModal.css";

export default function BookingModal() {
  const { isOpen, bookingData, closeBooking } = useBooking();
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    style: "Fine Line",
    placement: "Forearm",
    size: 3,
    budget: "",
    date: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync initial prefill values whenever modal opens with bookingData
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      setForm((prev) => ({
        ...prev,
        style: bookingData.style || "Fine Line",
        size: bookingData.size !== undefined ? bookingData.size : 3,
        budget: bookingData.budget || "",
        placement: bookingData.placement || "Forearm",
        idea: bookingData.design ? `Enquiring to claim flash: "${bookingData.design}"` : prev.idea,
      }));
      setErrors({});
      setIsSubmitted(false);
      setCopied(false);

      if (dialogRef.current && !dialogRef.current.open) {
        dialogRef.current.showModal();
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialogRef.current && dialogRef.current.open) {
        dialogRef.current.close();
      }
      document.body.style.overflow = "";
      if (triggerRef.current && typeof triggerRef.current.focus === "function") {
        triggerRef.current.focus();
      }
    }
  }, [isOpen, bookingData]);

  const handleClose = () => {
    closeBooking();
  };

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateBookingForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Focus first error field
      const firstField = Object.keys(validation.errors)[0];
      const element = document.getElementById(`booking-${firstField}`);
      if (element) element.focus();
      return;
    }

    const mailtoUrl = buildMailtoUrl({
      recipient: site.email,
      values: { ...form, source: bookingData.source },
      depositInfo: `Rs ${site.depositInr.toLocaleString("en-IN")} adjustable against final price`,
    });

    setIsSubmitted(true);
    // Open email client
    window.location.href = mailtoUrl;
  };

  const handleCopy = async () => {
    const text = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nStyle: ${form.style}\nPlacement: ${form.placement}\nSize: ${form.size} in\nBudget: ₹${form.budget || "Standard"}\nIdea: ${form.idea}\nSource: ${bookingData.source}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <dialog
      ref={dialogRef}
      className="booking-modal"
      onClick={handleBackdropClick}
      onClose={handleClose}
      aria-labelledby="booking-modal-title"
    >
      <div className="booking-modal__card">
        {/* Header */}
        <div className="booking-modal__header">
          <div>
            <span className="booking-modal__label">CONSULT & BOOKING</span>
            <h2 id="booking-modal-title" className="booking-modal__title">
              BOOK A SESSION
            </h2>
          </div>
          <button
            type="button"
            className="booking-modal__close-btn"
            onClick={handleClose}
            aria-label="Close booking modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Prefill Badge */}
        {(bookingData.design || bookingData.source) && !isSubmitted && (
          <div className="booking-modal__badge">
            <span className="booking-modal__badge-dot" />
            <span>
              {bookingData.design
                ? `Design: ${bookingData.design}`
                : `Source: ${bookingData.source}`}
            </span>
          </div>
        )}

        {!isSubmitted ? (
          <form className="booking-modal__form" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="booking-field">
              <label htmlFor="booking-name" className="booking-field__label">
                Full name <span className="booking-field__req">*</span>
              </label>
              <input
                id="booking-name"
                name="name"
                type="text"
                className={`booking-field__input ${errors.name ? "is-invalid" : ""}`}
                placeholder="e.g. Maya Sen"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
                required
              />
              {errors.name && (
                <span id="err-name" className="booking-field__error">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Phone & Email row */}
            <div className="booking-modal__grid-2">
              <div className="booking-field">
                <label htmlFor="booking-phone" className="booking-field__label">
                  Phone / WhatsApp <span className="booking-field__req">*</span>
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  className={`booking-field__input ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "err-phone" : undefined}
                  required
                />
                {errors.phone && (
                  <span id="err-phone" className="booking-field__error">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="booking-field">
                <label htmlFor="booking-email" className="booking-field__label">
                  Email (optional)
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  className={`booking-field__input ${errors.email ? "is-invalid" : ""}`}
                  placeholder="maya@example.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                />
                {errors.email && (
                  <span id="err-email" className="booking-field__error">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Style & Placement */}
            <div className="booking-modal__grid-2">
              <div className="booking-field">
                <label htmlFor="booking-style" className="booking-field__label">
                  Tattoo Style
                </label>
                <select
                  id="booking-style"
                  name="style"
                  className="booking-field__input booking-field__select"
                  value={form.style}
                  onChange={handleChange}
                >
                  <option value="Fine Line">Fine Line</option>
                  <option value="Black & Grey">Black & Grey</option>
                  <option value="Blackwork">Blackwork</option>
                  <option value="Realism">Realism</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Not sure">Not sure yet</option>
                </select>
              </div>

              <div className="booking-field">
                <label htmlFor="booking-placement" className="booking-field__label">
                  Placement on body
                </label>
                <select
                  id="booking-placement"
                  name="placement"
                  className="booking-field__input booking-field__select"
                  value={form.placement}
                  onChange={handleChange}
                >
                  <option value="Forearm">Forearm</option>
                  <option value="Upper arm">Upper arm</option>
                  <option value="Shoulder">Shoulder</option>
                  <option value="Back">Back</option>
                  <option value="Chest">Chest</option>
                  <option value="Ribs">Ribs</option>
                  <option value="Thigh">Thigh</option>
                  <option value="Calf">Calf</option>
                  <option value="Ankle">Ankle</option>
                  <option value="Hand/Fingers">Hand / Fingers</option>
                  <option value="Neck">Neck</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Size & Budget */}
            <div className="booking-modal__grid-2">
              <div className="booking-field">
                <label htmlFor="booking-size" className="booking-field__label">
                  Size in inches <span className="booking-field__req">*</span>
                  <span className="booking-field__hint">(longest side)</span>
                </label>
                <input
                  id="booking-size"
                  name="size"
                  type="number"
                  min="1"
                  max="40"
                  className={`booking-field__input ${errors.size ? "is-invalid" : ""}`}
                  value={form.size}
                  onChange={handleChange}
                  aria-invalid={!!errors.size}
                  aria-describedby={errors.size ? "err-size" : undefined}
                  required
                />
                {errors.size && (
                  <span id="err-size" className="booking-field__error">
                    {errors.size}
                  </span>
                )}
              </div>

              <div className="booking-field">
                <label htmlFor="booking-budget" className="booking-field__label">
                  Budget in INR
                </label>
                <div className="booking-field__prefix-wrap">
                  <span className="booking-field__prefix">₹</span>
                  <input
                    id="booking-budget"
                    name="budget"
                    type="number"
                    className="booking-field__input booking-field__input--prefix"
                    placeholder="e.g. 5000"
                    value={form.budget}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Preferred Date */}
            <div className="booking-field">
              <label htmlFor="booking-date" className="booking-field__label">
                Preferred Date (Tue-Sun)
              </label>
              <input
                id="booking-date"
                name="date"
                type="date"
                min={todayStr}
                className="booking-field__input"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            {/* Idea / Concept */}
            <div className="booking-field">
              <div className="booking-field__header">
                <label htmlFor="booking-idea" className="booking-field__label">
                  Your Idea & Story <span className="booking-field__req">*</span>
                </label>
                <span className="booking-field__counter">
                  {form.idea.length}/600
                </span>
              </div>
              <textarea
                id="booking-idea"
                name="idea"
                rows="4"
                maxLength="600"
                className={`booking-field__textarea ${errors.idea ? "is-invalid" : ""}`}
                placeholder="Describe what you want to wear on your skin, any references you have, or specific symbolism..."
                value={form.idea}
                onChange={handleChange}
                aria-invalid={!!errors.idea}
                aria-describedby={errors.idea ? "err-idea" : undefined}
                required
              />
              {errors.idea && (
                <span id="err-idea" className="booking-field__error">
                  {errors.idea}
                </span>
              )}
            </div>

            <div className="booking-modal__footer">
              <p className="booking-modal__disclaimer">
                Deposit of ₹{site.depositInr.toLocaleString("en-IN")} secures your session date and applies directly to the final total.
              </p>
              <CtaButton
                type="submit"
                variant="primary"
                size="lg"
                className="booking-modal__submit-btn"
              >
                <span>SEND ENQUIRY</span>
                <Send size={18} aria-hidden="true" />
              </CtaButton>
            </div>
          </form>
        ) : (
          <div className="booking-modal__success">
            <div className="booking-modal__success-icon">
              <Check size={36} />
            </div>
            <h3 className="booking-modal__success-title">EMAIL APP OPENING...</h3>
            <p className="booking-modal__success-desc">
              Your default email client has been opened with your enquiry prefilled.
            </p>

            <div className="booking-modal__note">
              <strong>Important:</strong> Please attach your reference images and photos of the placement area directly in your email. (Mailto links cannot attach images automatically).
            </div>

            <div className="booking-modal__success-actions">
              <CtaButton
                variant="secondary"
                size="md"
                onClick={handleCopy}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY DETAILS"}</span>
              </CtaButton>

              <CtaButton
                variant="primary"
                size="md"
                href={buildWhatsAppUrl({ phone: site.whatsappNumber, values: form })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                <span>OPEN ON WHATSAPP</span>
              </CtaButton>
            </div>

            <div className="booking-modal__fallback-link">
              <span>Didn't open? </span>
              <a
                href={buildMailtoUrl({ recipient: site.email, values: { ...form, source: bookingData.source } })}
                className="booking-modal__direct-email"
              >
                Click here to retry mailto <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
