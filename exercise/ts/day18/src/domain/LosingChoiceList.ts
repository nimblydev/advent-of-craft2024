import { Choice } from "./Choice";
import { Reason } from "./Reason";

export class LosingChoiceList {
  constructor(private readonly _unfavorableChoices: Map<Choice, Reason>) {}

  addLoosers(choice: Choice, reason: Reason) {
    this._unfavorableChoices.set(choice, reason);
  }
  get unfavorableChoices() {
    return this._unfavorableChoices;
  }

  find(choice: Choice): boolean {
    return this.unfavorableChoices.has(choice);
  }

  getLooserReasonText(choice: Choice): string | undefined {
    return this.unfavorableChoices.get(choice).reason;
  }
}
