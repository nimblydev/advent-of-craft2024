import { faker } from "@faker-js/faker";
import { T } from "../src/domain/Toy";
import { rightValue } from "./fp.extensions";
import { Time } from "./Time";

export class ToyBuilder {
  private readonly stock: number;

  private constructor(stock: number) {
    this.stock = stock;
  }

  static toysInStock(stock: number = 1): ToyBuilder {
    return new ToyBuilder(stock);
  }

  build(): T {
    return rightValue(T.create(Time.provider, faker.lorem.word(), this.stock));
  }
}
