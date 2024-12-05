import { validateEID } from "./validateEID";

describe("EID validation", () => {
  it("should return false for null EID", () => {
    expect(validateEID(null)).toBe(false);
  });

  it("should return false for empty string", () => {
    expect(validateEID("")).toBe(false);
  });

  it("should return true for 19845606 (valid EID)", () => {
    expect(validateEID("19845606")).toBe(true);
  });
});
