import test from "node:test";
import assert from "node:assert/strict";
import { validateBookingForm, INDIAN_PHONE_REGEX, buildMailtoUrl } from "./validation.js";

test("INDIAN_PHONE_REGEX validates standard 10 digit Indian numbers", () => {
  assert.equal(INDIAN_PHONE_REGEX.test("9876543210"), true);
  assert.equal(INDIAN_PHONE_REGEX.test("+91 9876543210"), true);
  assert.equal(INDIAN_PHONE_REGEX.test("+91-8765432109"), true);
  assert.equal(INDIAN_PHONE_REGEX.test("12345"), false);
  assert.equal(INDIAN_PHONE_REGEX.test("5555555555"), false); // starts with 5
});

test("validateBookingForm catches missing required fields", () => {
  const result = validateBookingForm({
    name: "",
    phone: "",
    size: "",
    idea: "",
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.size);
  assert.ok(result.errors.idea);
});

test("validateBookingForm passes on valid input", () => {
  const result = validateBookingForm({
    name: "Arjun Verma",
    phone: "9876543210",
    size: 4,
    idea: "A fine line moth on inner forearm",
  });
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test("buildMailtoUrl generates valid mailto URI with params", () => {
  const url = buildMailtoUrl({
    recipient: "hello@rudraink.in",
    values: {
      name: "Maya Sen",
      phone: "9876543210",
      style: "Fine Line",
      size: 3,
      idea: "Dagger and star",
      source: "Hero CTA",
    },
  });
  assert.ok(url.startsWith("mailto:hello@rudraink.in"));
  assert.ok(url.includes("subject="));
  assert.ok(url.includes("body="));
});
