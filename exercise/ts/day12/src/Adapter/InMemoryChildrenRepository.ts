import { Effect } from "effect";
import { Child } from "../Domain/Child";
import { IChildrenRepository } from "../Ports/IChildrenRepository";
import { error } from "effect/Console";
import { fromNullable, Option } from "effect/Option";

export class InMemoryChildrenRepository implements IChildrenRepository {
  private readonly children: Child[] = [];

  addChild(child: Child): void {
    this.children.push(child);
  }

  getChildByName = (childName: string): Option<Child> =>
    fromNullable(this.children.find((child) => child.name === childName));
}
