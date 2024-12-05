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

  it("should return false for 198456066 a too long EID)", () => {
    expect(validateEID("198456066")).toBe(false);
  });

  it("should return false for 2230 a too short EID)", () => {
    expect(validateEID("2230")).toBe(false);
  });

  it("should return false for 40000325 (invalid sex digit)", () => {
    expect(validateEID("40000325")).toBe(false);
  });

  it("should return false for 00000394 (invalid sex digit)", () => {
    expect(validateEID("00000394")).toBe(false);
  });
});
