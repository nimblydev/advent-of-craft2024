export class Building {
  static whichFloor(instructions: string): number {
    let val: Array<[string, number]> = [];

    for (const element of instructions) {
      if (instructions.includes("🧝")) {
        const j = isClosingParenthesis(element) ? 3 : -2;
        val.push([element, j]);
      } else if (!instructions.includes("🧝")) {
        val.push([element, isOpeningParenthesis(element) ? 1 : -1]);
      } else {
        val.push([element, isOpeningParenthesis(element) ? 42 : -2]);
      }
    }

    return Building.calculateTotalFromTuples(val);
  }

  private static calculateTotalFromTuples(val: [string, number][]) {
    return val.reduce((acc, [_, j]) => acc + j, 0);
  }
}
function isOpeningParenthesis(c: string) {
  return c === "(";
}

function isClosingParenthesis(c: string) {
  return c === ")";
}
