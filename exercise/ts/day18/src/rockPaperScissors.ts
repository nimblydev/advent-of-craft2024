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

export const conf = {
  Rock: {
    Scissors: "crushes",
    Lizard: "crushes",
  },
  Paper: {
    Rock: "covers",
    Spock: "disproves",
  },
  Scissors: {
    Paper: "cuts",
    Lizard: "decapitates",
  },
  Spock: {
    Rock: "vaporizes",
    Scissors: "smashes",
  },
  Lizard: {
    Paper: "eats",
    Spock: "poisons",
  },
} as const;

export const buildOutcomeHandler = (
  conf: Record<string, Record<string, string>>
): OutcomeHandler => {
  return new OutcomeHandler(
    new Map(
      Object.entries(conf).map(([winner, looserMap]) => [
        Choice[winner],
        new WinningOutcome(
          new LosingChoiceList(
            new Map(
              Object.entries(looserMap).map(([looser, reason]) => [
                Choice[looser],
                new Reason(reason),
              ])
            )
          )
        ),
      ])
    )
  );
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
