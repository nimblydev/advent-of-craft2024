import { Either } from "effect";
import { Child, Gift, ManufacturedGift } from "./models";

export class Factory extends Map<Gift, ManufacturedGift> {
  findManufacturedGift(gift: Gift): ManufacturedGift | undefined {
    return this.get(gift);
  }
}

export class Inventory extends Map<string, Gift> {
  pickUpGift(barCode: string): Either.Either<Gift, Error> {
    const gift = this.get(barCode);
    return gift
      ? Either.right(gift)
      : Either.left(new Error("Missing gift: Gift wasn't manufactured"));
  }
}

export class WishList extends Map<Child, Gift> {
  identifyGift(child: Child): Gift | undefined {
    return this.get(child);
  }
}
