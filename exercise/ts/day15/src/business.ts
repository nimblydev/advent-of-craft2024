import { Child, Gift, Sleigh } from "./models";
import { Factory, Inventory, WishList } from "./dependencies";
import { Effect, Either, pipe } from "effect";
import { set } from "effect/HashMap";

export class Business {
  constructor(
    private factory: Factory,
    private inventory: Inventory,
    private wishList: WishList
  ) {}

  loadGiftsInSleigh(...children: Child[]): Sleigh {
    const sleigh = new Sleigh();
    children.forEach((child) => {
      const setSleigh = (gift: Gift) =>
        sleigh.set(child, `Gift: ${gift.name} has been loaded!`);

      const program = pipe(
        child,
        (child) => this.wishList.identifyGift(child),
        Effect.flatMap((gift) => this.factory.findManufacturedGift(gift)),
        Effect.flatMap((manufacturedGift) =>
          this.inventory.pickUpGift(manufacturedGift.barCode)
        ),
        Effect.map((gift) => setSleigh(gift))
      );

      Effect.runPromise(program);
    });
    return sleigh;
  }
}
