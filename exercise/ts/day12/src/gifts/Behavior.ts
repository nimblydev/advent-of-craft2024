export class Behavior {
  public static readonly NAUGHTY = new Behavior("naughty");
  public static readonly NICE = new Behavior("nice");
  public static readonly VERY_NICE = new Behavior("very nice");

  private constructor(public readonly value: string) {}
}
