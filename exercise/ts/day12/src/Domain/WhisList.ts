import { Toy } from "./Toy";

export class WhishList {
  private readonly toys: Toy[] = [];

  constructor(toys: Array<Toy>) {
    toys.forEach((toy) => this.toys.push(toy));
  }

  add(toy: Toy): void {
    this.toys.push(toy);
  }

  getFirstChoice(): Toy {
    return this.toys.at(0);
  }

  getSecondChoice(): Toy {
    return this.toys.at(1);
  }

  getThirdChoice(): Toy {
    return this.toys.at(2);
  }
}
