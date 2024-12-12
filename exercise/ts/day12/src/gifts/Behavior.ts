export class Behavior {
  public static readonly NAUGHTY = new Behavior("naughty");
  public static readonly NICE = new Behavior("nice");
  public static readonly VERY_NICE = new Behavior("very nice");

  private constructor(public readonly value: string) {}

  public isNaughty(): boolean {
    return this === Behavior.NAUGHTY;
  }
  public isNice(): boolean {
    return this === Behavior.NICE;
  }
  public isVeryNice(): boolean {
    return this === Behavior.VERY_NICE;
  }
}
