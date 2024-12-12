import { IChildrenRepository } from "../Ports/IChildrenRepository";
import { Child } from "./Child";
import { Toy } from "./Toy";

export class Santa {
  private readonly childrenRepository: IChildrenRepository;

  constructor(childrenRepository: IChildrenRepository) {
    this.childrenRepository = childrenRepository;
  }

  addChild(child: Child): void {
    this.childrenRepository.addChild(child);
  }

  chooseToyForChild(childName: string): Toy | undefined {
    const foundChild = this.childrenRepository.getChildByName(childName);

    if (!foundChild) {
      throw new Error("No such child found");
    }

    return foundChild.getMeritedGift();
  }
}
