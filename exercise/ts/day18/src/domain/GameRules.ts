import { Result } from "../rockPaperScissors";
import { Choice } from "./Choice";
import { WinningOutcome } from "./WinningOutcome";

const PLAYER1 = "Player 1";
const PLAYER2 = "Player 2";
export class OutcomeHandler {
  constructor(private readonly _winner: Map<Choice, WinningOutcome>) {}

  private getChoice(choice) {
    return this._winner.get(choice);
  }

  private getWinningSelection(winnerChoice: Choice): WinningOutcome {
    return this.getChoice(winnerChoice);
  }

  private getLosingReasonText(
    winningChoice: Choice,
    losingChoice: Choice
  ): string {
    return this.getWinningSelection(winningChoice).getLosingReasonText(
      losingChoice
    );
  }

  public getMatchResult(player1Choice: Choice, player2Choice: Choice): Result {
    if (player1Choice === player2Choice)
      return { winner: "Draw", reason: "same choice" };

    const isPlayer1Winning =
      this.getChoice(player1Choice).doesItBeat(player2Choice);

    const winningChoice = isPlayer1Winning ? player1Choice : player2Choice;
    const losingChoice = isPlayer1Winning ? player2Choice : player1Choice;

    return {
      winner: winningChoice === player1Choice ? PLAYER1 : PLAYER2,
      reason: this.getWinnerReason(winningChoice, losingChoice),
    };
  }

  getWinnerReason(winningChoice: Choice, losingChoice: Choice) {
    return `${winningChoice.name} ${this.getLosingReasonText(
      winningChoice,
      losingChoice
    )} ${losingChoice.name}`;
  }
}
