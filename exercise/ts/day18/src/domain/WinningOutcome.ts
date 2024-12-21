import { Choice } from "./Choice";
import { LosingChoiceList } from "./LosingChoiceList";

export class WinningOutcome {
  constructor(private readonly _loosers: LosingChoiceList) {}

  get loosers() {
    return this._loosers;
  }

  public getLosingReasonText(choice: Choice): string | undefined {
    return this.loosers.getLooserReasonText(choice);
  }

  public doesItBeat(choice: Choice): boolean {
    return this.loosers.find(choice);
  }
}
