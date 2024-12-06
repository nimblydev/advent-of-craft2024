import { validateEID } from "../src/validateEID";

describe("EID validation", () => {
  it("should return false for null EID", () => {
    expect(validateEID(null)).toBeFalsy();
  });

  it("should return false for empty string", () => {
    expect(validateEID("")).toBeFalsy();
  });

  it("should return true for 19845606 (valid EID)", () => {
    expect(validateEID("19845606")).toBeTruthy();
  });

  it("should return false for 198456066 a too long EID)", () => {
    expect(validateEID("198456066")).toBeFalsy();
  });

  it("should return false for 2230 a too short EID)", () => {
    expect(validateEID("2230")).toBeFalsy();
  });

  it("should return false for 40000325 (invalid sex digit)", () => {
    expect(validateEID("40000325")).toBeFalsy();
  });

  it("should return false for 00000394 (invalid sex digit)", () => {
    expect(validateEID("00000394")).toBeFalsy();
  });

  it("should return false for 1ab14599 (invalid characters)", () => {
    expect(validateEID("1ab14599")).toBeFalsy();
  });

  it("should return false for 19814x08 (invalid serial number)", () => {
    expect(validateEID("19814x08")).toBeFalsy();
  });

  it("should return false for 19912378 (incoirrectcontrol key)", () => {
    expect(validateEID("19912378")).toBeFalsy();
  });
});
