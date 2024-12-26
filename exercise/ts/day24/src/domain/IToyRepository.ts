import { Option } from "fp-ts/Option";
import { T } from "./Toy";

export interface IToyRepository {
  fBn(toyName: string): Option<T>;

  fBi(id: string): Option<Object>;

  save(toy: T): void;
}
