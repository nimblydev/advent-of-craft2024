export const NAUGHTY = Symbol("naughty");
export const NICE = Symbol("nice");
export const VERY_NICE = Symbol("very nice");

export class Behavior {
  public static readonly NAUGHTY = new Behavior(NAUGHTY);
  public static readonly NICE = new Behavior(NICE);
  public static readonly VERY_NICE = new Behavior(VERY_NICE);

  private constructor(
    private readonly _value: typeof NAUGHTY | typeof NICE | typeof VERY_NICE
  ) {}

  public isNaughty(): boolean {
    return this === Behavior.NAUGHTY;
  }
  public isNice(): boolean {
    return this === Behavior.NICE;
  }
  public isVeryNice(): boolean {
    return this === Behavior.VERY_NICE;
  }
  public getType(): symbol {
    return this._value;
  }
}
