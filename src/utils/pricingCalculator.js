/**
 * Pure calculation logic for tattoo price estimates
 */

export function roundToNearestHundred(num) {
  return Math.round(num / 100) * 100;
}

export function formatInr(num) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

export function calculateEstimate({
  inches = 3,
  style = "Fine Line",
  isColor = false,
  isCoverup = false,
  rates = {
    "Fine Line": 1800,
    "Black & Grey": 2200,
    "Blackwork": 2000,
    "Realism": 3200,
    "Traditional": 2400,
  },
  sessionMin = 2500,
}) {
  const safeInches = Math.max(1, Math.min(40, Number(inches) || 1));
  const rate = rates[style] || rates["Fine Line"] || 1800;

  let base = Math.max(sessionMin, safeInches * rate);

  let multiplier = 1.0;
  if (isColor) multiplier += 0.20;
  if (isCoverup) multiplier += 0.25;

  const adjusted = base * multiplier;

  const minRaw = adjusted * 0.90;
  const maxRaw = adjusted * 1.15;

  const minEstimate = roundToNearestHundred(minRaw);
  const maxEstimate = roundToNearestHundred(maxRaw);

  return {
    inches: safeInches,
    style,
    minEstimate,
    maxEstimate,
    formattedRange: `${formatInr(minEstimate)} – ${formatInr(maxEstimate)}`,
  };
}
