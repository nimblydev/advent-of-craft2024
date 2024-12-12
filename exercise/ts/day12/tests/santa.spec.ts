import { Toy } from "../src/Domain/Toy";
import { Child } from "../src/Domain/Child";
import { Santa } from "../src/Domain/Santa";
import { InMemoryChildrenRepository } from "../src/Adapter/InMemoryChildrenRepository";
import { ChildBuilder } from "./childBuilder";

describe("Santa's gift selection process", () => {
  const Playstation = new Toy("playstation");
  const Ball = new Toy("ball");
  const Plush = new Toy("plush");
  let santa: Santa;
  let commonChildBuilder: ChildBuilder;

  beforeEach(() => {
    santa = new Santa(new InMemoryChildrenRepository());
    commonChildBuilder = new ChildBuilder()
      .withName("bobby")
      .isDreamingOf([Playstation, Plush, Ball]);
  });

  it("should give the third choice to a naughty child", () => {
    const bobby = commonChildBuilder.hasBeenANaughtyChild().build();

    santa.addChild(bobby);

    expect(santa.chooseToyForChild("bobby")).toBe(Ball);
  });

  it("should give the second choice to a nice child", () => {
    const bobby = commonChildBuilder.hasBeenANiceChild().build();

    santa.addChild(bobby);

    expect(santa.chooseToyForChild("bobby")).toBe(Plush);
  });

  it("should give the first choice to a very nice child", () => {
    const bobby = commonChildBuilder.hasBeenAVeryNiceChild().build();

    santa.addChild(bobby);

    expect(santa.chooseToyForChild("bobby")).toBe(Playstation);
  });

  it("should throw an exception if the child does not exist", () => {
    const bobby: Child = commonChildBuilder.hasBeenAVeryNiceChild().build();

    santa.addChild(bobby);

    expect(() => santa.chooseToyForChild("alice")).toThrow(
      "No such child found"
    );
  });
});
