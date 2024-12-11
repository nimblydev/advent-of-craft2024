import { ToyType } from "./toyType";

const TEEN_GIFT_CATEGORY = "Teen";
const NO_GIFT_MESSAGE = "No gifts to prepare.";
const PREPARATION_MESSAGE_TEMPLATE = "{preparer} will prepare the gifts.";
const ELVES = "Elves";
const SANTA = "Santa";
const REQUIRED_PERCENTAGE = {
  [ToyType.EDUCATIONAL]: 0.25,
  [ToyType.FUN]: 0.3,
  [ToyType.CREATIVE]: 0.2,
};

const AGE_CATEGORIES_IN_ASCENDING_ORDER = Object.freeze([
  { maxAge: 2, label: "Baby" },
  { maxAge: 5, label: "Toddler" },
  { maxAge: 12, label: "Child" },
]);

const MIN_SANTA_GIFT_COUNT = 50;
const FALLBACK_RATIO = 1;

const whoWillPrepareTheGifts = (numberOfGifts: number): string =>
  numberOfGifts < MIN_SANTA_GIFT_COUNT ? ELVES : SANTA;

export class Preparation {
  static prepareGifts(numberOfGifts: number): string {
    if (numberOfGifts <= 0) return NO_GIFT_MESSAGE;

    const preparer = whoWillPrepareTheGifts(numberOfGifts);
    return PREPARATION_MESSAGE_TEMPLATE.replace("{preparer}", preparer);
  }

  static categorizeGift(age: number): string {
    return (
      AGE_CATEGORIES_IN_ASCENDING_ORDER.find(({ maxAge }) => age <= maxAge)
        ?.label ?? TEEN_GIFT_CATEGORY
    );
  }

  static ensureToyBalance(
    toyType: ToyType,
    toysCount: number,
    totalToys: number
  ): boolean {
    const typePercentage = toysCount / totalToys;
    return typePercentage >= (REQUIRED_PERCENTAGE[toyType] ?? FALLBACK_RATIO);
  }
}
