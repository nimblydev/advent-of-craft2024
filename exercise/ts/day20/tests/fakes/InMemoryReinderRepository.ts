import { Either, left, right } from "fp-ts/lib/Either";
import { ReindeerToCreate } from "../../src/service";
import { Reindeer, ReindeerColor, ReindeerErrorCode } from "../../src/types";
import { v5 as uuidv5 } from "uuid";
import { ReindeerRepository } from "../../src/ReindeerRepository";
import { createHash } from "crypto";

const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // Example namespace UUID

export class InMemoryReinderRepository implements ReindeerRepository {
  private readonly reindeer: Reindeer[] = [
    new Reindeer(
      "40f9d24d-d3e0-4596-adc5-b4936ff84b19",
      "Petar",
      ReindeerColor.Purple
    ),
  ];

  public get(id: string): Either<ReindeerErrorCode, Reindeer> {
    const reindeer = this.reindeer.find((r) => r.id === id);
    return reindeer ? right(reindeer) : left(ReindeerErrorCode.NotFound);
  }

  public create(
    reindeerToCreate: ReindeerToCreate
  ): Either<ReindeerErrorCode, Reindeer> {
    const existingReindeer = this.reindeer.find(
      (r) => r.name === reindeerToCreate.name
    );
    if (existingReindeer) {
      return left(ReindeerErrorCode.AlreadyExist);
    }

    const newReindeer = new Reindeer(
      this.deterministicallyGenerateId(this.hashName(reindeerToCreate.name)),
      reindeerToCreate.name,
      reindeerToCreate.color
    );
    this.reindeer.push(newReindeer);

    return right(newReindeer);
  }

  private readonly hashName = (name: string): string =>
    createHash("sha1").update(name).digest("hex");

  private readonly deterministicallyGenerateId = (name: string): string =>
    uuidv5(this.hashName(name), NAMESPACE);
}
