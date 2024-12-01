import {
  Reindeer,
  ReindeerLocation,
  SantaCommunicator,
} from "../src/santaCommunicator";
import { TestLogger } from "./doubles/testLogger";

const REINDEER_NAME_DASHER = "Dasher";
const NORTH_POLE = "North Pole";
const redeer = new Reindeer(
  REINDEER_NAME_DASHER,
  new ReindeerLocation(NORTH_POLE, 5)
);
const numberOfDaysToRest = 2;
const numberOfDaysBeforeChristmas = 24;
const santaCommunicationDetails = {
  reindeer: redeer,
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
      redeer,
      TOO_LATE_FOR_CHRISTMAS
    );

    expect(overdue).toBeTruthy();
    expect(logger.getLog()).toEqual("Overdue for Dasher located North Pole.");
  });

  test("shouldReturnFalseWhenNoOverdue", () => {
    redeer.newLocation = new ReindeerLocation(
      NORTH_POLE,
      numberOfDaysBeforeChristmas - numberOfDaysToRest - 1
    );
    const overdue = communicator.isReindeerOverdue(
      redeer,
      numberOfDaysBeforeChristmas
    );
    expect(overdue).toBeFalsy();
  });
});
