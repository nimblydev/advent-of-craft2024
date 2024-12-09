import { SantaService } from "../src/santaService";
import { ChildBuilder } from "./ChildBuilder";
import { GiftRequestBuilder } from "./GiftRequestBuilder";

describe("santa analyzing child requests", () => {
  const service = new SantaService();

  test("request is approved for nice child with feasible gift", () => {
    const niceChild = new ChildBuilder()
      .withFirstName("Alice")
      .withLastName("Thomas")
      .withAge(9)
      .withBehavior("nice")
      .withGiftRequest(
        new GiftRequestBuilder()
          .withGiftName("Bicycle")
          .withFeasible(true)
          .withImportance("nice to have")
          .build()
      )
      .build();
    expect(service.evaluateRequest(niceChild)).toBeTruthy();
  });

  test("request is denied for naughty child", () => {
    const naughtyChild = new ChildBuilder()
      .withFirstName("Noa")
      .withLastName("Thierry")
      .withAge(6)
      .withBehavior("naughty")
      .withGiftRequest(
        new GiftRequestBuilder()
          .withGiftName("SomeToy")
          .withFeasible(true)
          .withImportance("dream")
          .build()
      )
      .build();
    expect(service.evaluateRequest(naughtyChild)).toBeFalsy();
  });

  test("request is denied for nice child with infeasible gift", () => {
    const niceChildWithInfeasibleGift = new ChildBuilder()
      .withFirstName("Charlie")
      .withLastName("Joie")
      .withAge(3)
      .withBehavior("nice")
      .withGiftRequest(
        new GiftRequestBuilder()
          .withGiftName("AnotherToy")
          .withFeasible(false)
          .withImportance("dream")
          .build()
      )
      .build();
    expect(service.evaluateRequest(niceChildWithInfeasibleGift)).toBeFalsy();
  });
});
