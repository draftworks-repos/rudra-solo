export const pricing = {
  ratesPerInch: {
    "Fine Line": 1800,
    "Black & Grey": 2200,
    "Blackwork": 2000,
    "Realism": 3200,
    "Traditional": 2400,
  },
  multipliers: {
    color: 0.20, // +20%
    coverup: 0.25, // +25%
  },
  sessionMinimumInr: 2500,
  depositInr: 1500,
  touchUpPolicy: "Free touch-up within 3 months",

  // Size reference strip
  sizeStrip: [
    { inches: 1, reference: "1 in = coin", startingPriceInr: 2500, badge: "Session min" },
    { inches: 2, reference: "2 in = matchbox", startingPriceInr: 3500 },
    { inches: 3, reference: "3 in = teacup", startingPriceInr: 5500 },
    { inches: 4, reference: "4 in = palm", startingPriceInr: 8000 },
    { inches: 6, reference: "6 in = phone", startingPriceInr: 12000 },
    { inches: 8, reference: "8 in = forearm span", startingPriceInr: 18000 },
  ],

  // Large projects strip
  largeProjects: [
    { title: "Half Sleeve", scope: "10-12 in span", startingInr: 30000 },
    { title: "Full Sleeve", scope: "Shoulder to wrist", startingInr: 55000 },
    { title: "Back Piece", scope: "Full shoulder-to-hip canvas", startingInr: null, customText: "Quoted after consult" },
  ],

  notes: [
    { label: "Deposit", value: "₹1,500", desc: "Adjusted against final price at checkout" },
    { label: "Session Minimum", value: "₹2,500", desc: "Covers single-use sterile needles & setup" },
    { label: "Touch-Up Guarantee", value: "3 Months Free", desc: "One complimentary touch-up once fully healed" },
  ],
};

export default pricing;
