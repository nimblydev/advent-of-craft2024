import { Child, Gift, Sleigh } from "./models";
import { Factory, Inventory, WishList } from "./dependencies";
import { Either } from "effect";

export class Business {
  constructor(
    private factory: Factory,
    private inventory: Inventory,
    private wishList: WishList
  ) {}

  loadGiftsInSleigh(...children: Child[]): Sleigh {
    const sleigh = new Sleigh();
    children.forEach((child) => {
      const gift = this.wishList.identifyGift(child);
      if (gift) {
        const finalGift = Either.flatMap(
          this.factory.findManufacturedGift(gift),
          (manufacturedGift) =>
            this.inventory.pickUpGift(manufacturedGift.barCode)
        );

        Either.match(finalGift, {
          onLeft: (failedGift) => console.log(failedGift.message),
          onRight: (gift) =>
            sleigh.set(child, `Gift: ${gift.name} has been loaded!`),
        });
      }
    });
    return sleigh;
  }
}
