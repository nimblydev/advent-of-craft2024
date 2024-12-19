import { Option } from "effect";
import { IChildrenRepository } from "../Ports/IChildrenRepository";
import { Child } from "./Child";
import { Toy } from "./Toy";
import { flatMap } from "effect/Option";

export class Santa {
  private readonly childrenRepository: IChildrenRepository;

  constructor(childrenRepository: IChildrenRepository) {
    this.childrenRepository = childrenRepository;
  }

  addChild(child: Child): void {
    this.childrenRepository.addChild(child);
  }

  chooseToyForChild(childName: string): Option.Option<Toy> {
    const foundChild = this.childrenRepository.getChildByName(childName);

    const result = foundChild.pipe(flatMap((child) => child.getMeritedGift()));

    return result;
  }
}
