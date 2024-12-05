export const validateEID = (eid: string) => {
  if (!eid) return false;
  if (eid.length !== 8) return false;

  const sexDigit = eid.at(0);
  if (!["1", "2", "3"].includes(sexDigit)) return false;
  return true;
};
