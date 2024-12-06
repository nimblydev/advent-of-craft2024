const EID_LENGTH = 8;
const ELVEN_SEX = ["1", "2", "3"];
const numericStringPattern = /^\d+$/;
const eidModulus = 97;
const CONTROL_KEY_LENGTH = 2;
const ZERO_PADDING_CHAR = "0";

export const validateEID = (eid: string) => {
  const eidYearCode = eid?.substring(1, 3);
  const eidSexIdentifier = eid?.substring(0, 1);
  const eidCheckCharacter = eid?.substring(6, 8);
  const eidPrefix = eid?.substring(0, 6);

  return (
    isNotEmpty(eid) &&
    isLengthValid(eid) &&
    isOnlyDigits(eid) &&
    isValidSexDigit(eidSexIdentifier) &&
    isValidEIDYear(eidYearCode) &&
    isControlKeyValid(eidPrefix, eidCheckCharacter)
  );
};

const isValidSexDigit = (sexDigit: string) => ELVEN_SEX.includes(sexDigit);

const isNotEmpty = (eid: string) => eid !== null && eid !== "";

const isLengthValid = (eid: string) => eid.length === EID_LENGTH;

const isOnlyDigits = (eid: string) => numericStringPattern.test(eid);

const isValidEIDYear = (year: string) =>
  isOnlyDigits(year) && year.length === 2;

const isControlKeyValid = (eidPrefix: string, controlKey: string) => {
  const modulo = parseInt(eidPrefix, 10) % eidModulus;
  const complementedValue = (eidModulus - modulo)
    .toString()
    .padStart(CONTROL_KEY_LENGTH, ZERO_PADDING_CHAR);

  return complementedValue === controlKey;
};
