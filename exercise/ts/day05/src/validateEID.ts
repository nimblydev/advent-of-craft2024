const validIEDPattern = /^[123]\d{7}$/;
const MODULUS = 97;

type Validator = (eid: string, eidPart?: string) => boolean;
type Range = { start: number; end?: number };

export const validateEID = (potentialEID: string) =>
  validIEDPattern.test(potentialEID) && validateChecksum(potentialEID);

const validateChecksum = (potentialEID: string) =>
  isControlKeyValid(potentialEID);

const isControlKeyValid: Validator = (potentialEID: string) => {
  const calculateKey = calculatedKey(extractPrefix(potentialEID));

  const extract = extractKey(potentialEID);
  return extract === calculateKey;
};
const extractPrefix = (potentialEID: string) =>
  parseInt(potentialEID.substring(0, 6));

const extractKey = (eid: string) => parseInt(eid.substring(6, 8));

const calculatedKey = (prefix: number) => MODULUS - (prefix % MODULUS);
