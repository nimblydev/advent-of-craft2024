import { Choice, EmojiChoice } from "./domain/Choice";
import { OutcomeHandler } from "./domain/GameRules";
import { LosingChoiceList } from "./domain/LosingChoiceList";
import { WinningOutcome } from "./domain/WinningOutcome";
import { Reason } from "./domain/Reason";

export type Winner = "Player 1" | "Player 2" | "Draw";
export type Result = {
  winner: Winner;
  reason: string;
};

export const defaultRules = new OutcomeHandler(
  new Map([
    [
      Choice.Rock,
      new WinningOutcome(
        new LosingChoiceList(
          new Map([
            [Choice.Scissors, new Reason("crushes")],
            [Choice.Lizard, new Reason("crushes")],
          ])
        )
      ),
    ],
    [
      Choice.Paper,
      new WinningOutcome(
        new LosingChoiceList(
          new Map([
            [Choice.Rock, new Reason("covers")],
            [Choice.Spock, new Reason("disproves")],
          ])
        )
      ),
    ],
    [
      Choice.Scissors,
      new WinningOutcome(
        new LosingChoiceList(
          new Map([
            [Choice.Paper, new Reason("cuts")],
            [Choice.Lizard, new Reason("decapitates")],
          ])
        )
      ),
    ],

    [
      Choice.Spock,
      new WinningOutcome(
        new LosingChoiceList(
          new Map([
            [Choice.Rock, new Reason("vaporizes")],
            [Choice.Scissors, new Reason("smashes")],
          ])
        )
      ),
    ],
    [
      Choice.Lizard,
      new WinningOutcome(
        new LosingChoiceList(
          new Map([
            [Choice.Paper, new Reason("eats")],
            [Choice.Spock, new Reason("poisons")],
          ])
        )
      ),
    ],
  ])
);

export class RockPaperScissors {
  private readonly _rules: OutcomeHandler;
  constructor(rules: OutcomeHandler = defaultRules) {
    this._rules = rules;
  }

  get rules() {
    return this._rules;
  }

  public play(player1: EmojiChoice, player2: EmojiChoice): Result {
    const player1Choice = Choice.fromEmoji(player1);
    const player2Choice = Choice.fromEmoji(player2);

    return this.rules.getMatchResult(player1Choice, player2Choice);
  }
}
