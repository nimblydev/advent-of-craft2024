import { InMemoryToyRepository } from "./doubles/inMemoryToyRepository";
import { ToyProductionService } from "../src/services/toyProductionService";
import { Toy } from "../src/domain/toy";

describe("ToyProductionService", () => {
  const TOY_NAME = "Train";

  it("assignToyToElfShouldPassTheItemInProduction", () => {
    const repository = new InMemoryToyRepository();
    const service = new ToyProductionService(repository);
    const toy = new Toy(TOY_NAME);

    service.saveNewToy(toy);
    service.assignToyToElf(TOY_NAME);

    expect(toy.isInProduction()).toBeTruthy();
  });
});
