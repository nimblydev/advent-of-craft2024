const EID_LENGTH = 8;
const ELVEN_SEX = ["1", "2", "3"];
const numericStringPattern = /^\d+$/;
const MODULUS = 97;
const CONTROL_KEY_LENGTH = 2;
const ZERO_PADDING_CHAR = "0";

export const validateEID = (eid: string) => {
  if (!eid) return false;

  const validators = [
    isLengthValid,
    isOnlyDigits,
    (eid: string) => isValidSexDigit(eid.substring(0, 1)),
    (eid: string) => isValidEIDYear(eid.substring(1, 3)),
    (eid: string) =>
      isControlKeyValid(eid.substring(0, 6), eid.substring(6, 8)),
  ];

  return validators.every((validator) => validator(eid));
};

const isValidSexDigit = (sexDigit: string) => ELVEN_SEX.includes(sexDigit);

const isNotEmpty = (eid: string) => eid !== null && eid !== "";

const isLengthValid = (eid: string) => eid.length === EID_LENGTH;

const isOnlyDigits = (eid: string) => numericStringPattern.test(eid);

const isValidEIDYear = (year: string) =>
  isOnlyDigits(year) && year.length === 2;

const isControlKeyValid = (eidPrefix: string, controlKey: string) => {
  const modulo = parseInt(eidPrefix, 10) % MODULUS;
  const complementedValue = (MODULUS - modulo)
    .toString()
    .padStart(CONTROL_KEY_LENGTH, ZERO_PADDING_CHAR);

  return complementedValue === controlKey;
};
