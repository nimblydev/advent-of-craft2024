import { Either } from "fp-ts/lib/Either";
import { Reindeer, ReindeerErrorCode } from "./types";
import { ReindeerToCreate } from "./service";

export interface ReindeerRepository {
  get(id: string): Either<ReindeerErrorCode, Reindeer>;
  create(
    reindeerToCreate: ReindeerToCreate
  ): Either<ReindeerErrorCode, Reindeer>;
}
