import { Behavior, NAUGHTY, NICE, VERY_NICE } from "./Behavior";
import { Toy } from "./Toy";
import { WhishList } from "./WhisList";
import { Option, none } from "effect/Option";

export class Child {
  public wishList: WhishList;

  constructor(public name: string, public behavior: Behavior) {}

  setWishlist(firstChoice: Toy, secondChoice: Toy, thirdChoice: Toy): void {
    this.wishList = new WhishList([firstChoice, secondChoice, thirdChoice]);
  }

  getMeritedGift(): Option<Toy> {
    const behaviorToChoiceMap = {
      [NAUGHTY]: this.wishList.getThirdChoice(),
      [NICE]: this.wishList.getSecondChoice(),
      [VERY_NICE]: this.wishList.getFirstChoice(),
    };

    return behaviorToChoiceMap[this.behavior.getType()] || none<Toy>();
  }
}
