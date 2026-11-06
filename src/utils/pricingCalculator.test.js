import test from "node:test";
import assert from "node:assert/strict";
import { calculateEstimate, roundToNearestHundred, formatInr } from "./pricingCalculator.js";

test("roundToNearestHundred rounds accurately", () => {
  assert.equal(roundToNearestHundred(2449), 2400);
  assert.equal(roundToNearestHundred(2450), 2500);
  assert.equal(roundToNearestHundred(5180), 5200);
});

test("formatInr outputs rupee currency string", () => {
  const formatted = formatInr(4500);
  assert.match(formatted, /4,500/);
});

test("calculateEstimate respects session minimum", () => {
  const result = calculateEstimate({
    inches: 1,
    style: "Fine Line", // 1 * 1800 = 1800, below 2500 min
    isColor: false,
    isCoverup: false,
    sessionMin: 2500,
  });
  // base = 2500. 2500 * 0.9 = 2250 -> 2300, 2500 * 1.15 = 2875 -> 2900
  assert.equal(result.minEstimate, 2300);
  assert.equal(result.maxEstimate, 2900);
});

test("calculateEstimate applies color and coverup multipliers", () => {
  const plain = calculateEstimate({
    inches: 4,
    style: "Blackwork", // 4 * 2000 = 8000
    isColor: false,
    isCoverup: false,
  });

  const modified = calculateEstimate({
    inches: 4,
    style: "Blackwork",
    isColor: true, // +20%
    isCoverup: true, // +25%
  });

  assert.ok(modified.minEstimate > plain.minEstimate);
  assert.ok(modified.maxEstimate > plain.maxEstimate);
});
