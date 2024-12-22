import { Either, right } from "fp-ts/lib/Either";
import { Reindeer, ReindeerColor, ReindeerErrorCode } from "./types";
import { ReindeerRepository } from "./ReindeerRepository";

export class ReindeerService {
  constructor(private readonly reindeerRepository: ReindeerRepository) {}

  public health(): Either<never, string> {
    return right("OK");
  }

  public get(id: string): Either<ReindeerErrorCode, Reindeer> {
    return this.reindeerRepository.get(id);
  }

  public create(
    reindeerToCreate: ReindeerToCreate
  ): Either<ReindeerErrorCode, Reindeer> {
    return this.reindeerRepository.create(reindeerToCreate);
  }
}

export class ReindeerToCreate {
  constructor(public name: string, public color: ReindeerColor) {}
}
