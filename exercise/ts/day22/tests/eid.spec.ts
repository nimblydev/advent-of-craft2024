import * as fc from "fast-check";
import { sample } from "fast-check";
import { Sex } from "../src/eid/sex";
import { Year } from "../src/eid/year";
import { SerialNumber } from "../src/eid/serialNumber";
import { EID } from "../src/eid/eid";
import { isLeft, isRight } from "fp-ts/Either";

fc.configureGlobal({ numRuns: 2000 });

const yearGenerator = fc
  .integer()
  .filter((x) => x >= 0 && x <= 99)
  .map((x) => Year.parse(x.toString()))
  .map((year) => {
    if (isRight(year)) {
      return year.right;
    }
  });

const serialNumberGenerator = fc
  .integer()
  .filter((x) => x >= 1 && x <= 999)
  .map((x) => SerialNumber.parse(x.toString()))
  .map((serialNumber) => {
    if (isRight(serialNumber)) {
      return serialNumber.right;
    }
  });

const eidGenerator = fc
  .record({
    sex: fc.constantFrom(Sex.Sloubi, Sex.Gagna, Sex.Catact),
    year: yearGenerator,
    serialNumber: serialNumberGenerator,
  })
  .map(({ sex, year, serialNumber }) => new EID(sex, year, serialNumber));

describe("EID", () => {
  test("round tripping", () => {
    fc.assert(
      fc.property(eidGenerator, (validEID) => {
        const parsedEID = EID.parse(validEID.toString());
        expect(isRight(parsedEID)).toBe(true);

        if (isRight(parsedEID)) {
          expect(parsedEID.right.equals(validEID)).toBeTruthy();
        }
      })
    );
  });

  test("invalid EID can never be parsed", () => {
    fc.assert(
      fc.property(eidGenerator, mutantGenerator, (validEID, mutator) => {
        const mutated = mutator.mutate(validEID);
        const parsed = EID.parse(mutated);
        expect(isLeft(parsed)).toBeTruthy();
      })
    );
  });
});

class Mutator {
  constructor(
    public name: string,
    private readonly func: (eid: EID) => fc.Arbitrary<string>
  ) {}

  mutate(eid: EID): string {
    return sample(this.func(eid))[0];
  }
}

const randomCharacterAppenderMutator: Mutator = new Mutator(
  "add a random character to the IED string end",
  (eid: EID) => {
    return fc.constant(eid.toString() + Math.floor(Math.random() * 10));
  }
);

const randomOneCharacterMutator: Mutator = new Mutator(
  "Mutator that change one character to a random one",
  (eid: EID) => {
    return fc.integer({ min: 0, max: 7 }).chain((charIndex) => {
      const originalCharacter = parseInt(eid.toString().charAt(charIndex));
      return fc
        .array(fc.integer({ min: 0, max: 9 }))
        .chain((numberCandidate) => {
          const replacementCharacter = numberCandidate.find(
            (x) => x !== originalCharacter
          );
          return fc.constant(
            eid.toString().substring(0, charIndex) +
              replacementCharacter +
              eid.toString().substring(charIndex + 1)
          );
        });
    });
  }
);

const shortenStringMutator: Mutator = new Mutator(
  "Mutator that shorten the string",
  (eid: EID) => {
    return fc.integer({ min: 1, max: 7 }).map((x) => {
      return eid.toString().substring(0, x);
    });
  }
);

const sexMutator: Mutator = new Mutator(
  "Mutator that change the gender to an invalid one",
  (eid: EID) => {
    return fc.integer({ min: 4, max: 9 }).map((x) => {
      return x.toString() + eid.toString().substring(1);
    });
  }
);

const serialInvalidMutator: Mutator = new Mutator(
  "Mutator that change the serial number to an invalid one",
  (eid: EID) => {
    const INVALID_SERIAL = "000";
    return fc.constant(
      eid.toString().substring(0, 3) +
        INVALID_SERIAL +
        eid.toString().substring(6)
    );
  }
);

const controlKeyMutator: Mutator = new Mutator(
  "Mutator that increment the control key",
  (eid: EID) => {
    return fc.constant(
      eid.toString().substring(0, 6) +
        (eid.key() + 1).toString().padStart(2, "0")
    );
  }
);

const randomInvalidControlKeyMutator: Mutator = new Mutator(
  "Mutator that change the control key to invalid values",
  (eid: EID) => {
    const invalidKeys = [98, 99];
    return fc.constant(
      eid.toString().substring(0, 6) +
        invalidKeys[Math.floor(Math.random() * invalidKeys.length)]
    );
  }
);

const mutantGenerator: fc.Arbitrary<Mutator> = fc.constantFrom(
  randomCharacterAppenderMutator,
  sexMutator,
  serialInvalidMutator,
  randomInvalidControlKeyMutator,
  randomOneCharacterMutator,
  shortenStringMutator,
  controlKeyMutator
);
