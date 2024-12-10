const ELF = "🧝";
const isOpeningParenthesis = (c: string) => c === "(";

const isClosingParenthesis = (c: string) => c === ")";

const calculateLetterValueWhenElfEmoji = (c: string) => {
  if (isElf(c)) return 0;
  return isClosingParenthesis(c) ? 3 : -2;
};

const calculateLetterValueWhenNoElfEmoji = (c: string) =>
  isOpeningParenthesis(c) ? 1 : -1;

const isElf = (c: string) => c === ELF;
const withElf = (letters) => letters.some(isElf);

export class Building {
  static whichFloor(instructions: string): number {
    const characters = [...instructions];
    const calculationFn = withElf(characters)
      ? calculateLetterValueWhenElfEmoji
      : calculateLetterValueWhenNoElfEmoji;

    return computeCharacterSum(calculationFn)(characters);
  }
}
const computeCharacterSum =
  (calculationFn: Function) =>
  (characters: string[]): number =>
    characters.reduce((acc, current) => acc + calculationFn(current), 0);
