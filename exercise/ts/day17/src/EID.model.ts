import { Either, Just, Left, Right } from "purify-ts";

const MODULUS = 97;
export class ElfGender {
  static readonly Sloubi = new ElfGender("1");
  static readonly Gagna = new ElfGender("2");
  static readonly Catact = new ElfGender("3");

  private constructor(private readonly value: string) {}

  private static readonly genderMap = new Map([
    [1, ElfGender.Sloubi],
    [2, ElfGender.Gagna],
    [3, ElfGender.Catact],
  ]);
  static readonly parse = (value: number): Either<Error, ElfGender> =>
    this.genderMap.get(value)
      ? Right(this.genderMap.get(value))
      : Left(new Error("Not a valid ElfGender"));

  public toString = (): string => this.value;
}

export class YearDate {
  private constructor(private readonly value: number) {}

  static readonly parse = (value: number): Either<Error, YearDate> =>
    value >= 0 ? Right(new YearDate(value)) : Left(new Error("Invalid Year"));

  public toString = (): string => this.value.toString().padStart(2, "0");
}

export class Serial {
  private constructor(private readonly value: number) {}

  static readonly parse = (value: number): Either<Error, Serial> =>
    value > 0 ? Right(new Serial(value)) : Left(new Error("Invalid Serial"));

  public toString = (): string => this.value.toString().padStart(3, "0");
}

export class ControlKey {
  private constructor(private readonly value: number) {}

  static readonly parse = (
    prefix: number,
    key: number
  ): Either<Error, ControlKey> =>
    MODULUS - (prefix % MODULUS) === key
      ? Right(new ControlKey(key))
      : Left(new Error("Invalid control key"));

  public toString = (): string => this.value.toString().padStart(2, "0");
}

export class EID {
  private constructor(
    private readonly gender: ElfGender,
    public readonly birthYear: YearDate,
    public readonly serialNumber: Serial,
    public readonly controlKey: ControlKey
  ) {}

  public static readonly parse = (maybeEID: string): Either<Error, EID> => {
    const match = RegExp(/^(\d)(\d{2})((?!000)\d{3})(\d{2})$/).exec(maybeEID);
    if (!match) return Left(new Error("Invalid EID format"));

    const [gender, year, serial, controlKey] = EID.parseMatchDetails(match);
    
    return ElfGender.parse(gender)
      .chain((gender) => YearDate.parse(year).map((year) => ({ gender, year })))
      .chain(({ gender, year }) =>
        Serial.parse(serial).map((serial) => ({ gender, year, serial }))
      )
      .chain(({ gender, year, serial }) =>
        ControlKey.parse(EID.extractPrefix(maybeEID), controlKey).map(
          (controlKey) => new EID(gender, year, serial, controlKey)
        )
      );
  };

  private static readonly parseMatchDetails = (match): Array<number> => {
    const [_, genderString, yearString, serialString, controlKeyString] =
      match;

    return  [
      genderString,
      yearString,
      serialString,
      controlKeyString,
    ].map((stringValue) => parseInt(stringValue, 10)));
  };

  private static readonly extractPrefix = (maybeEID) =>
    parseInt(maybeEID.slice(0, 6));

  public toString = (): string =>
    `${this.gender} ${this.birthYear} ${this.serialNumber} ${this.controlKey}`;
}
