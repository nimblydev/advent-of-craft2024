const EID_LENGTH = 8;
const SEX_DIGIT_INDEX = 0;
const ELVEN_SEX = ["1", "2", "3"];

export const validateEID = (eid: string) => {
  if (isEmpty(eid)) return false;
  if (lengthIsInvalid(eid)) return false;
  const sexDigit = eid.at(SEX_DIGIT_INDEX);
  if (!sexDigitValidation(sexDigit)) return false;

  return true;
};

const sexDigitValidation = (sexDigit: string) => {
  return ELVEN_SEX.includes(sexDigit);
};

const isEmpty = (eid: string) => eid === null || eid === "";

const lengthIsInvalid = (eid: string) => eid.length !== EID_LENGTH;
