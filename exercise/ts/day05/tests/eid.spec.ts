import { validateEID } from "../src/validateEID";

describe("EID validation", () => {
  it.each([
    ["19845606", true],
    ["30600233", true],
    ["29999922", true],
    ["11111151", true],
    ["19800767", true],
  ])("its representation %s -> %s", (eid, expectedResult) => {
    const validationResult = validateEID(eid);
    expect(validationResult).toBeTruthy();
  });

  it.each([
    [null, "null EID"],
    ["", "empty string"],
    ["198456066", "too long EID"],
    ["2230", "too short EID"],
    ["40000325", "invalid sex digit"],
    ["00000394", "invalid sex digit"],
    ["1ab14599", "invalid characters"],
    ["19814x08", "invalid serial number"],
    ["19912378", "incorrect control key"],
  ])("should return false for %s (%s)", (invalidEID, reason) => {
    expect(validateEID(invalidEID)).toBeFalsy();
  });
});
