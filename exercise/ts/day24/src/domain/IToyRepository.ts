import { Option } from "fp-ts/Option";
import { T } from "./Toy";

export interface IToyRepository {
  findByName(toyName: string): Option<T>;

  findById(id: string): Option<Object>;

  save(toy: T): void;
}
