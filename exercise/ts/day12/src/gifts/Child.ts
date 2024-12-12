import { Behavior } from "./Behavior";
import { Toy } from "./Toy";
import { WhishList } from "./WhisList";

export class Child {
  public wishlist: WhishList;
  public behavior: Behavior;

  constructor(public name: string, behavior: Behavior) {}

  setWishlist(firstChoice: Toy, secondChoice: Toy, thirdChoice: Toy): void {
    this.wishlist = new WhishList([firstChoice, secondChoice, thirdChoice]);
  }

  getMeritedGift(): Toy {
    if (this.behavior === Behavior.NAUGHTY) {
      return this.wishlist.getThirdChoice();
    } else if (this.behavior === Behavior.NICE) {
      return this.wishlist.getSecondChoice();
    } else if (this.behavior === Behavior.VERY_NICE) {
      return this.wishlist.getFirstChoice();
    }

    throw new Error("Unknown behavior");
  }
}
