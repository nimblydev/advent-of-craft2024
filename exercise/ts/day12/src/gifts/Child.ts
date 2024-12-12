import { Behavior } from "./Behavior";
import { Toy } from "./Toy";
import { WhishList } from "./WhisList";

export class Child {
  public wishlist: WhishList;

  constructor(public name: string, public behavior: Behavior) {}

  setWishlist(firstChoice: Toy, secondChoice: Toy, thirdChoice: Toy): void {
    this.wishlist = new WhishList([firstChoice, secondChoice, thirdChoice]);
  }

  getMeritedGift(): Toy {
    if (this.behavior.isNaughty()) {
      return this.wishlist.getThirdChoice();
    } else if (this.behavior.isNice()) {
      return this.wishlist.getSecondChoice();
    } else if (this.behavior.isVeryNice()) {
      return this.wishlist.getFirstChoice();
    }

    throw new Error("Unknown behavior");
  }
}
