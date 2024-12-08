import { defineFeature, loadFeature } from "jest-cucumber";
import { Workshop } from "../src/workshop/workshop";
import { Gift } from "../src/workshop/gift";

const feature = loadFeature("features/worshop.feature");
const TOY_NAME = "1 Super Nintendo";
let elvenWorkshop: Workshop;

defineFeature(feature, (test) => {
  describe("Workshop", () => {
    beforeEach(() => {
      elvenWorkshop = new Workshop();
    });

    test("An elven workshop can produce a known toy", ({
      given,
      when,
      then,
    }) => {
      let completedGift: Gift;

      given("an empty workshop with a known 'Super Nintendo' toy", () => {
        elvenWorkshop.addGift(new Gift(TOY_NAME));
      });

      when("I ask to produce a 'Super Nintendo'", () => {
        completedGift = elvenWorkshop.completeGift(TOY_NAME);
      });

      then("I should produce a 'Super Nintendo'", () => {
        expect(completedGift).not.toBeNull();
      });
    });

    test("An elven workshop can't produce a non existing toy", ({
      given,
      when,
      then,
    }) => {
      let completedGift: Gift;
      const NON_EXISTING_TOY = "NonExistingToy";

      given("an empty workshop", () => {});

      when("I ask to complete a non existing toy", () => {
        completedGift = elvenWorkshop.completeGift(NON_EXISTING_TOY);
      });

      then("I should not produce anything", () => {
        expect(completedGift).toBeNull();
      });
    });
  });
});
