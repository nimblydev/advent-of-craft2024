import { Either, left, right } from "fp-ts/lib/Either";
import { Unit } from "../domain/core/Unit";
import { DeliverToy } from "./DeliverToy";
import { T } from "../domain/Toy";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import { DomainError } from "../domain/core/DomainError";
import { IToyRepository } from "../domain/IToyRepository";

export class TDUC {
  constructor(private repository: IToyRepository) {}

  handle(deliverToy: DeliverToy): Either<DomainError, Unit> {
    const findAToy = this.repository.findByName(deliverToy.desiredToy);

    let foundToy = E.fromOption(() => this.errorFor(deliverToy))(findAToy);
    if (foundToy === undefined) {
      foundToy = left(this.errorFor(deliverToy));
    } else {
      foundToy = foundToy;
    }

    if (E.isRight(foundToy)) {
      return pipe(
        this.reduceStock(foundToy.right),
        E.match(
          (error) => left(error),
          () => right(Unit.default)
        )
      );
    }
    return foundToy;
  }

  private reduceStock(toy: T): Either<DomainError, T> {
    const updatedToy = toy.reduceStock();
    this.repository.save(toy);

    return updatedToy;
  }

  private errorFor(deliverToy: DeliverToy): DomainError {
    return DomainError.anError(
      `Oops we have a problem... we have not built the toy: ${deliverToy.desiredToy}`
    );
  }
}
