export const validateEID = (eid: string) => {
  if (eid === null || eid === "") return false;
  if (eid.length < 8) return false;
  if (!["1", "2", "3"].includes(eid.at(0))) return false;
  return true;
};
