const EID_LENGTH = 8;
const SEX_DIGIT_INDEX = 0;
const ELVEN_SEX = ["1", "2", "3"];

export const validateEID = (eid: string) =>
  !isEmpty(eid) &&
  !lengthIsInvalid(eid) &&
  sexDigitValidation(eid.at(SEX_DIGIT_INDEX));

const sexDigitValidation = (sexDigit: string) => {
  return ELVEN_SEX.includes(sexDigit);
};

const isEmpty = (eid: string) => eid === null || eid === "";

const lengthIsInvalid = (eid: string) => eid.length !== EID_LENGTH;
