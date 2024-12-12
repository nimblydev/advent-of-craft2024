import { Child } from "./Child";
import { Toy } from "./Toy";

export class Santa {
  private readonly childrenRepository: Child[] = [];

  addChild(child: Child): void {
    this.childrenRepository.push(child);
  }

  chooseToyForChild(childName: string): Toy | undefined {
    const foundChild = this.childrenRepository.find(
      (child) => child.name === childName
    );

    if (!foundChild) {
      throw new Error("No such child found");
    }

    return foundChild.getMeritedGift();
  }
}
