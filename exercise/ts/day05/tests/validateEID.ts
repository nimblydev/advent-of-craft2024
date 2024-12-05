export const validateEID = (eid: string) => {
  if (isEmpty(eid)) return false;
  if (lengthIsInvalid(eid)) return false;
  const sexDigit = eid.at(0);
  if (!sexDigitValidation(sexDigit)) return false;

  return true;
};

const sexDigitValidation = (sexDigit: string) => {
  return ["1", "2", "3"].includes(sexDigit);
};

const isEmpty = (eid: string) => eid === null || eid === "";

const lengthIsInvalid = (eid: string) => eid.length !== 8;
