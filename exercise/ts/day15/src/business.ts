import { Child, Gift, LogList, Sleigh } from "./models";
import { Factory, Inventory, WishList } from "./dependencies";
import { Console, Effect, pipe } from "effect";

export class Business {
  readonly logList: LogList = new LogList();
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

      const program = pipe(
        child,
        (child) => this.wishList.identifyGift(child),
        Effect.flatMap((gift) => this.factory.findManufacturedGift(gift)),
        Effect.flatMap((manufacturedGift) =>
          this.inventory.pickUpGift(manufacturedGift.barCode)
        ),
        Effect.map((gift) => setSleigh(gift)),

        Effect.catchTags({
          NotManufacturedError: (e) =>
            Effect.succeed(this.logList.push(e.message)),
          GiftMissplacedError: (e) =>
            Effect.succeed(this.logList.push(e.message)),
          NotSoNiceChildError: (e) =>
            Effect.succeed(this.logList.push(e.message)),
        })
      );

      Effect.runPromise(program);
    });
    return sleigh;
  }
}
