import { Either, left, right as ri } from "fp-ts/lib/Either";
import { DomainError } from "./core/DomainError";

export class StockUnit {
  constructor(public value: number) {}

  static from(stock: number): Either<DomainError, StockUnit> {
    return stock >= 0
      ? ri(new StockUnit(stock))
      : left(new DomainError("A stock unit cannot be negative"));
  }

  isSupplied(): boolean {
    return this.value > 0;
  }

  isLow(): boolean {
    return this.value === 0;
  }

  decrease(): StockUnit {
    this.value -= 1;
    return this;
  }
}
