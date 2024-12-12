import { Behavior } from "../src/Domain/Behavior";
import { Child } from "../src/Domain/Child";

import { WhishList } from "../src/Domain/WhisList";

export class ChildBuilder {
  behavior: Behavior;
  whishList: any;
  name: string;
  constructor() {
    this.behavior = Behavior.NICE;
    this.whishList = new WhishList([]);
  }

  withName(name) {
    this.name = name;
    return this;
  }

  isDreamingOf(whishList) {
    this.whishList = whishList;
    return this;
  }
  hasBeenANiceChild() {
    this.behavior = Behavior.NICE;
    return this;
  }
  hasBeenANaughtyChild() {
    this.behavior = Behavior.NAUGHTY;
    return this;
  }
  hasBeenAVeryNiceChild() {
    this.behavior = Behavior.VERY_NICE;
    return this;
  }

  build() {
    const child = new Child(this.name, this.behavior);
    child.setWishlist(this.whishList[0], this.whishList[1], this.whishList[2]);
    return child;
  }
}
