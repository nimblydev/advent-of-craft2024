export const validateEID = (eid: string) => {
  if (eid === null || eid === "") return false;
  if (eid.length < 8) return false;
  return true;
};
