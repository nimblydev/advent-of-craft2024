const EID_LENGTH = 8;
const ELVEN_SEX = ["1", "2", "3"];
const numericStringPattern = /^\d+$/;
const MODULUS = 97;
const CONTROL_KEY_LENGTH = 2;
const ZERO_PADDING_CHAR = "0";

export const validateEID = (eid: string) => {
  if (isEmpty(eid)) return false;

  const validators = [
    isLengthValid,
    isOnlyDigits,
    isValidSexDigit,
    isValidEIDYear,
    isControlKeyValid,
  ];
  return validators.every((validator) => validator(eid));
};

const isValidSexDigit = (eid: string) => {
  const sexDigit = eid.substring(0, 1);
  return ELVEN_SEX.includes(sexDigit);
};

const isEmpty = (eid: string) => eid === null || eid === "";

const isLengthValid = (eid: string) => eid.length === EID_LENGTH;

const isOnlyDigits = (eid: string) => numericStringPattern.test(eid);

const isValidEIDYear = (eid: string) => {
  const year = eid.substring(1, 3);
  return isOnlyDigits(year);
};

const isControlKeyValid = (eid: string) => {
  const eidPrefix = eid.substring(0, 6);
  const controlKey = eid.substring(6, 8);
  const modulo = parseInt(eidPrefix, 10) % MODULUS;
  const complementedValue = (MODULUS - modulo)
    .toString()
    .padStart(CONTROL_KEY_LENGTH, ZERO_PADDING_CHAR);

  return complementedValue === controlKey;
};
