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
    const behaviorToChoiceMap = {
      naughty: this.wishlist.getThirdChoice(),
      nice: this.wishlist.getSecondChoice(),
      veryNice: this.wishlist.getFirstChoice(),
    };

    return (
      behaviorToChoiceMap[this.behavior.getType()] ||
      new Error("Unknown behavior")
    );
  }
}
