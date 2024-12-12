import { Child } from "./gifts/Child";

export class ChildrenRepository {
  private readonly children: Child[] = [];

  addChild(child: Child): void {
    this.children.push(child);
  }

  getChildByName(childName: string): Child | undefined {
    return this.children.find((child) => child.name === childName);
  }
}
