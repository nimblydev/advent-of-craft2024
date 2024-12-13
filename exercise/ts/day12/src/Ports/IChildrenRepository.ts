import { Option } from "effect/Option";
import { Child } from "../Domain/Child";

export interface IChildrenRepository {
  addChild(child: Child): void;
  getChildByName(childName: string): Option<Child>;
}
