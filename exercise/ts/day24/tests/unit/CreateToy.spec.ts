import * as fc from "fast-check";
import { T } from "../../src/domain/Toy";
import { Time } from "../Time";
import * as E from "fp-ts/Either";
import { faker } from "@faker-js/faker";

describe("CreateToyTests", () => {
  it("can not create toy with invalid stock (<0)", () => {
    fc.assert(
      fc.property(
        fc.integer().filter((x) => x < 0),
        (stock) => {
          return E.isLeft(
            T.create(Time.provider, faker.commerce.product(), stock)
          );
        }
      )
    );
  });

  it("can create toy with valid stock (>= 0)", () => {
    fc.assert(
      fc.property(
        fc.integer().filter((x) => x >= 0),
        (stock) => {
          return E.isRight(
            T.create(Time.provider, faker.commerce.product(), stock)
          );
        }
      )
    );
  });
});
