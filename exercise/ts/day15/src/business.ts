import { Child, Gift, LogList, Sleigh } from "./models";
import {
  Factory,
  GiftMissplacedError,
  Inventory,
  NotManufacturedError,
  NotSoNiceChildError,
  WishList,
} from "./dependencies";
import { Effect, pipe } from "effect";

export class Business {
  constructor(
    private readonly factory: Factory,
    private readonly inventory: Inventory,
    private readonly wishList: WishList
  ) {}

  loadGiftsInSleigh(...children: Child[]): Sleigh {
    const sleigh = new Sleigh();

    children.forEach((child) => {
      const setSleigh = (gift: Gift) =>
        sleigh.set(child, `Gift: ${gift.name} has been loaded!`);

      const setSleighError = (
        error: GiftMissplacedError | NotManufacturedError | NotSoNiceChildError
      ) => sleigh.set(child, `${error.message}`);

      const program = pipe(
        child,
        (child) => this.wishList.identifyGift(child),
        Effect.flatMap((gift) => this.factory.findManufacturedGift(gift)),
        Effect.flatMap((manufacturedGift) =>
          this.inventory.pickUpGift(manufacturedGift.barCode)
        ),
        Effect.map((gift) => setSleigh(gift)),

        Effect.catchTags({
          NotManufacturedError: (e) => Effect.succeed(setSleighError(e)),
          GiftMissplacedError: (e) => Effect.succeed(setSleighError(e)),
          NotSoNiceChildError: (e) => Effect.succeed(setSleighError(e)),
        })
      );

      Effect.runPromise(program);
    });
    return sleigh;
  }
}
