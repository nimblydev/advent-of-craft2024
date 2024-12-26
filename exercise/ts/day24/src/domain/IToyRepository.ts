import { Option } from "fp-ts/Option";
import { T } from "./Toy";

export interface IToyRepository {
  fBn(toyName: string): Option<T>;

  findById(id: string): Option<Object>;

  save(toy: T): void;
}
