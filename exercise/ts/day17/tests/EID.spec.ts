// ## invalid EIDs
import { EID } from "../src/EID.model";

describe("EID", () => {
  test.each([
    [null, false],
    ["", false],
    ["2230", false],
    ["40000325", false],
    ["1ab14599", false],
    ["19814x08", false],
    ["19912378", false],
    ["19845606", true],
    ["30600233", true],
    ["29999922", true],
    ["11111151", true],
    ["19800767", true],
  ])("string is a valid EID", (EIDCandidate, isValid) => {
    const result = EID.parse(EIDCandidate).extract();
    isValid
      ? expect(result).toBeInstanceOf(EID)
      : expect(result).toBeInstanceOf(Error);
  });
});
