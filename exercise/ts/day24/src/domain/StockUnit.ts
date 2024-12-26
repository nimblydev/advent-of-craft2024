import { Either, left, right } from "fp-ts/lib/Either";
import { DomainError } from "./core/DomainError";

export class StockUnit {
  constructor(public value: number) {}

  static from(stock: number): Either<DomainError, StockUnit> {
    return stock >= 0
      ? right(new StockUnit(stock))
      : left(new DomainError("A stock unit cannot be negative"));
  }

  isSupplied(): boolean {
    return this.value > 0;
  }

  isLow(): boolean {
    return this.value === 0;
  }

  decrease(): this {
    this.value -= 1;
    return this;
  }
}
