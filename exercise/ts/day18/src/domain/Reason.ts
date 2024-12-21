export class Reason {
  constructor(private readonly _verb: string) {}
  get reason() {
    return this._verb;
  }
}
