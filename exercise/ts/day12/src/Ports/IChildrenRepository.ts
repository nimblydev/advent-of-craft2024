import { Child } from "../Domain/Child";

export interface IChildrenRepository {
  addChild(child: Child): void;
  getChildByName(childName: string): Child | undefined;
}
