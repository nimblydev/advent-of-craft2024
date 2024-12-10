const ELF = "🧝";
const OPENING_PARENTHESIS = "(";
const CLOSING_PARENTHESIS = ")";
const isOpeningParenthesis = (c: string) => c === OPENING_PARENTHESIS;
const isClosingParenthesis = (c: string) => c === CLOSING_PARENTHESIS;

const calculateValueWithElf = (c: string) => {
  if (isElf(c)) return 0;
  return isClosingParenthesis(c) ? 3 : -2;
};

const calculateValueWithoutElf = (c: string) =>
  isOpeningParenthesis(c) ? 1 : -1;

const isElf = (c: string) => c === ELF;
const withElf = (letters: string[]) => letters.some(isElf);

const sumCharacterValues =
  (calculationFn: (c: string) => number) =>
  (characters: string[]): number =>
    characters.reduce((acc, current) => acc + calculationFn(current), 0);

export class Building {
  static whichFloor(instructions: string): number {
    const characters = [...instructions];
    const calculationFn = withElf(characters)
      ? calculateValueWithElf
      : calculateValueWithoutElf;

    return sumCharacterValues(calculationFn)(characters);
  }
}
