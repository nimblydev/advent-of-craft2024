import { Option } from "fp-ts/Option";
import { T } from "./Toy";

export interface IToyRepository {
  fBn(na: string): Option<T>;

  fBi(id: string): Option<Object>;

  store(t: T): void;
}
