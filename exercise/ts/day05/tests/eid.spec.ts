import { validateEID } from "./validateEID";

describe("EID validation", () => {
  it("should return false for null EID", () => {
    expect(validateEID(null)).toBe(false);
  });
});
