/**
 * Validation utilities for booking enquiry
 */

export const INDIAN_PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBookingForm(values) {
  const errors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = "Please enter your name";
  }

  const cleanedPhone = (values.phone || "").trim().replace(/\s+/g, "");
  if (!cleanedPhone) {
    errors.phone = "Phone or WhatsApp number is required";
  } else if (!INDIAN_PHONE_REGEX.test(cleanedPhone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number (e.g. 9876543210)";
  }

  if (values.email && values.email.trim()) {
    if (!EMAIL_REGEX.test(values.email.trim())) {
      errors.email = "Enter a valid email address";
    }
  }

  const sizeNum = Number(values.size);
  if (!values.size || isNaN(sizeNum) || sizeNum < 1 || sizeNum > 40) {
    errors.size = "Size must be between 1 and 40 inches";
  }

  if (!values.idea || !values.idea.trim()) {
    errors.idea = "Please describe your tattoo idea or concept";
  } else if (values.idea.length > 600) {
    errors.idea = "Description cannot exceed 600 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoUrl({
  recipient = "hello@rudraink.in",
  values,
  depositInfo = "Rs 1,500 adjustable against final price",
}) {
  const subject = `Tattoo enquiry: ${values.name || "Client"} (${values.style || "Custom"})`;

  const lines = [
    `Name: ${values.name || ""}`,
    `Phone / WhatsApp: ${values.phone || ""}`,
    `Email: ${values.email || "Not provided"}`,
    `Style: ${values.style || "Not specified"}`,
    `Placement: ${values.placement || "Not specified"}`,
    `Size: ${values.size || ""} inches`,
    `Estimated Budget: ${values.budget ? "₹" + values.budget : "Standard rate"}`,
    `Preferred Date: ${values.date || "Flexible"}`,
    `Idea / Reference Notes:\r\n${values.idea || ""}`,
    ``,
    `Source: ${values.source || "Website CTA"}`,
    `Deposit info: ${depositInfo}`,
  ];

  const body = lines.join("\r\n");

  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return mailto.length > 1850 ? mailto.slice(0, 1850) : mailto;
}

export function buildWhatsAppUrl({
  phone = "+919876543210",
  values,
}) {
  const cleanNumber = phone.replace(/[^\d]/g, "");
  const text = `Hi Rudra! I'd like to enquire about a tattoo session.\n\n• Name: ${values.name || ""}\n• Style: ${values.style || ""}\n• Size: ${values.size || ""} in\n• Placement: ${values.placement || ""}\n• Idea: ${values.idea || ""}\n\n(Sent via rudraink.in)`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
