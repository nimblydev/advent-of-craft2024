import { ToyRepository } from "../domain/toyRepository";
import { Toy } from "../domain/toy";

export class ToyProductionService {
  private repository: ToyRepository;

  constructor(repository: ToyRepository) {
    this.repository = repository;
  }

  assignToyToElf(toyName: string): void {
    const toy = this.repository.findByName(toyName);
    toy.assignToElf();
    this.repository.save(toy);
  }
}
