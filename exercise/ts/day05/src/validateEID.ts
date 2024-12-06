const EID_LENGTH = 8;
const ELVEN_SEX = ["1", "2", "3"];
const validIEDPattern = /^[123]\d{7}$/;
const MODULUS = 97;
const CONTROL_KEY_LENGTH = 2;
const ZERO_PADDING_CHAR = "0";

type Validator = (eid: string, eidPart?: string) => boolean;
type Range = { start: number; end?: number };

export const validateEID = (potentialEID: string) =>
  validIEDPattern.test(potentialEID) && validateChecksum(potentialEID);

const validateChecksum = (potentialEID: string) =>
  isControlKeyValid(potentialEID);

const isControlKeyValid: Validator = (eid: string) => {
  const eidPrefix = eid.substring(0, 6);
  const modulo = parseInt(eidPrefix, 10) % MODULUS;
  const complementedValue = (MODULUS - modulo)
    .toString()
    .padStart(CONTROL_KEY_LENGTH, ZERO_PADDING_CHAR);

  return complementedValue === extractKey(eid);
};

const extractKey = (eid: string) => eid.substring(6, 8);
