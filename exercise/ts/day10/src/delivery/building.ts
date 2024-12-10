const sumArray = (values: Array<number>) =>
  values.reduce((acc, current) => acc + current, 0);

const isOpeningParenthesis = (c: string) => c === "(";

const isClosingParenthesis = (c: string) => c === ")";

export class Building {
  static whichFloor(instructions: string): number {
    let val: Array<number> = [];

    for (const element of instructions) {
      let valueToPush: number;
      if (instructions.includes("🧝")) {
        valueToPush = isClosingParenthesis(element) ? 3 : -2;
      } else if (!instructions.includes("🧝")) {
        valueToPush = isOpeningParenthesis(element) ? 1 : -1;
      } else {
        valueToPush = isOpeningParenthesis(element) ? 42 : -2;
      }
      val.push(valueToPush);
    }

    return sumArray(val);
  }
}
