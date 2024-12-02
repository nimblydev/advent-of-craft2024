import {
  Reindeer,
  ReindeerLocation,
  SantaCommunicator,
} from "../src/santaCommunicator";
import { TestLogger } from "./doubles/testLogger";

const REINDEER_NAME_DASHER = "Dasher";
const NORTH_POLE = "North Pole";
const reindeer = new Reindeer(
  REINDEER_NAME_DASHER,
  new ReindeerLocation(NORTH_POLE, 5)
);
const numberOfDaysToRest = 2;
const numberOfDaysBeforeChristmas = 24;
const santaCommunicationDetails = {
  reindeer: reindeer,
  numberOfDaysBeforeChristmas,
};
const TOO_LATE_FOR_CHRISTMAS = 5;

describe("SantaCommunicator", () => {
  let communicator: SantaCommunicator;
  let logger = new TestLogger();

  beforeEach(() => {
    communicator = new SantaCommunicator(numberOfDaysToRest, logger);
  });

  test("composeMessage", () => {
    const message = communicator.composeMessage(santaCommunicationDetails);
    expect(message).toEqual(
      "Dear Dasher, please return from North Pole in 17 day(s) to be ready and rest before Christmas."
    );
  });

  test("shouldDetectOverdueReindeer", () => {
    const overdue = communicator.isReindeerOverdue(
      reindeer,
      TOO_LATE_FOR_CHRISTMAS
    );

    expect(overdue).toBeTruthy();
    expect(logger.getLog()).toEqual("Overdue for Dasher located North Pole.");
  });

  test("shouldReturnFalseWhenNoOverdue", () => {
    const nearbyReindeer = new Reindeer(
      "Dancer",
      new ReindeerLocation(NORTH_POLE, 10)
    );

    const overdue = communicator.isReindeerOverdue(
      nearbyReindeer,
      numberOfDaysBeforeChristmas
    );
    expect(overdue).toBeFalsy();
  });
});
