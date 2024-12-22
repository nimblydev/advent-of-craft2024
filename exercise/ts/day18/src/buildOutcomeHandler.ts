import { Choice } from "./domain/Choice";
import { OutcomeHandler } from "./domain/GameRules";
import { LosingChoiceList } from "./domain/LosingChoiceList";
import { Reason } from "./domain/Reason";
import { WinningOutcome } from "./domain/WinningOutcome";

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
