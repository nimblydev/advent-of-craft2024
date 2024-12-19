import { Either } from "effect";
import { Child, Gift, ManufacturedGift } from "./models";

export class NotManufacturedError {
  readonly _tag = "NotManufacturedError";
  readonly message = "Missing manufactured gift: Gift wasn't manufactured!";
}

export class GiftMissplacedError {
  readonly _tag = "GiftMissplacedError";
  public readonly message =
    "Missing gift: The gift has probably been misplaced by the elves!";
}

export class NotSoNiceChildError {
  readonly _tag = "NotSoNiceChildError";
  constructor(readonly child: Child) {}
  public get message() {
    return `Missing gift: ${this.child.name} wasn't nice this year!`;
  }
}

export class Factory extends Map<Gift, ManufacturedGift> {
  findManufacturedGift(
    gift: Gift
  ): Either.Either<ManufacturedGift, NotManufacturedError> {
    const manufacturedGift = this.get(gift);
    return manufacturedGift
      ? Either.right(manufacturedGift)
      : Either.left(new NotManufacturedError());
  }
}

export class Inventory extends Map<string, Gift> {
  pickUpGift(barCode: string): Either.Either<Gift, GiftMissplacedError> {
    const gift = this.get(barCode);
    return gift ? Either.right(gift) : Either.left(new GiftMissplacedError());
  }
}

export class WishList extends Map<Child, Gift> {
  identifyGift(child: Child): Either.Either<Gift, NotSoNiceChildError> {
    const gift = this.get(child);
    return gift
      ? Either.right(gift)
      : Either.left(new NotSoNiceChildError(child));
  }
}
