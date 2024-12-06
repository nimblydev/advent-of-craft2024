const EID_LENGTH = 8;
const ELVEN_SEX = ["1", "2", "3"];
const numericStringPattern = /^\d+$/;

export const validateEID = (eid: string) => {
  const EidYearValue = eid?.substring(1, 3);
  const EidSexValue = eid?.substring(0, 1);
  const EIdControlKeyValue = eid?.substring(7, 8);

  return (
    !isEmpty(eid) &&
    !lengthIsInvalid(eid) &&
    isOnlyDigits(eid) &&
    sexDigitValidation(EidSexValue) &&
    yearValdidation(EidYearValue) &&
    controlKeyValidation(eid.substring(0, 7), EIdControlKeyValue)
  );
};

const sexDigitValidation = (sexDigit: string) => {
  return ELVEN_SEX.includes(sexDigit);
};

const isEmpty = (eid: string) => eid === null || eid === "";

const lengthIsInvalid = (eid: string) => eid.length !== EID_LENGTH;

const isOnlyDigits = (eid: string) => numericStringPattern.test(eid);

const yearValdidation = (year: string) => {
  return isOnlyDigits(year) && year.length === 2;
};

const controlKeyValidation = (eidPrefix: string, controlKey: string) => {
  const modulo = parseInt(eidPrefix) % 97;
  return 97 - modulo === parseInt(controlKey);
};
