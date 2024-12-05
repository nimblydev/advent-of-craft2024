export const validateEID = (eid: string) => {
  if (!eid) return false;
  if (eid.length !== 8) return false;

  const sexDigit = eid.at(0);
  if (!sexDigitValidation(sexDigit)) return false;

  return true;
};

const sexDigitValidation = (sexDigit: string) => {
  return ["1", "2", "3"].includes(sexDigit);
};
