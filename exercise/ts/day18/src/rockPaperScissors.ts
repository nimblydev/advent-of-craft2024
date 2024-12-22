import { Choice, EmojiChoice } from "./domain/Choice";
import { OutcomeHandler } from "./domain/GameRules";
import { buildOutcomeHandler } from "./buildOutcomeHandler";
import { conf } from "./settings/conf";

export type Winner = "Player 1" | "Player 2" | "Draw";
export type Result = {
  winner: Winner;
  reason: string;
};

export const defaultRules = buildOutcomeHandler(conf);

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
