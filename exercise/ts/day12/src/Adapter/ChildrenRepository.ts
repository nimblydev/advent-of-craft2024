import { Child } from "../Domain/Child";
import { IChildrenRepository } from "../Ports/IChildrenRepository";

export class ChildrenRepository implements IChildrenRepository {
  private readonly children: Child[] = [];

  addChild(child: Child): void {
    this.children.push(child);
  }

  getChildByName(childName: string): Child | undefined {
    return this.children.find((child) => child.name === childName);
  }
}
