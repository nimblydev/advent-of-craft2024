import { Toy } from "../src/Domain/Toy";
import { Child } from "../src/Domain/Child";
import { Santa } from "../src/Domain/Santa";
import { Behavior } from "../src/Domain/Behavior";
import { ChildrenRepository } from "../src/Adapter/ChildrenRepository";

describe("Santa's gift selection process", () => {
  const Playstation = new Toy("playstation");
  const Ball = new Toy("ball");
  const Plush = new Toy("plush");

  it("should give the third choice to a naughty child", () => {
    const bobby = new Child("bobby", Behavior.NAUGHTY);
    bobby.setWishlist(Playstation, Plush, Ball);

    const santa = new Santa(new ChildrenRepository());
    santa.addChild(bobby);

    expect(santa.chooseToyForChild("bobby")).toBe(Ball);
  });

  it("should give the second choice to a nice child", () => {
    const bobby = new Child("bobby", Behavior.NICE);
    bobby.setWishlist(Playstation, Plush, Ball);

    const santa = new Santa(new ChildrenRepository());
    santa.addChild(bobby);

    expect(santa.chooseToyForChild("bobby")).toBe(Plush);
  });

  it("should give the first choice to a very nice child", () => {
    const bobby = new Child("bobby", Behavior.VERY_NICE);
    bobby.setWishlist(Playstation, Plush, Ball);

    const santa = new Santa(new ChildrenRepository());
    santa.addChild(bobby);

    expect(santa.chooseToyForChild("bobby")).toBe(Playstation);
  });

  it("should throw an exception if the child does not exist", () => {
    const santa = new Santa(new ChildrenRepository());
    const bobby = new Child("bobby", Behavior.VERY_NICE);
    bobby.setWishlist(Playstation, Plush, Ball);

    santa.addChild(bobby);

    expect(() => santa.chooseToyForChild("alice")).toThrow(
      "No such child found"
    );
  });
});
