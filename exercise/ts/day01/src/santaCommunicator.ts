import { Logger } from "./logger";

interface ReindeerTravelDetails {
  reindeer: Reindeer;
  numberOfDaysBeforeChristmas: number;
}

export class ReindeerLocation {
  private readonly name: string;
  private readonly numberOfDaysFromNorthPole: number;

  constructor(location: string, numberOfDaysFromNorthPole: number) {
    this.name = location;
    this.numberOfDaysFromNorthPole = numberOfDaysFromNorthPole;
  }

  public get getLocation(): string {
    return this.name;
  }
  public get getNumberOfDaysForComingBack(): number {
    return this.numberOfDaysFromNorthPole;
  }
}

export class Reindeer {
  private readonly name: string;
  private location: ReindeerLocation;

  constructor(name: string, currentLocation: ReindeerLocation) {
    this.name = name;
    this.location = currentLocation;
  }
  public get reindeerName(): string {
    return this.name;
  }

  public get currentLocation(): string {
    return this.location.getLocation;
  }

  public set newLocation(location: ReindeerLocation) {
    this.location = location;
  }

  public getNumberOfDaysForComingBack(): number {
    return this.location.getNumberOfDaysForComingBack;
  }
}

export class SantaCommunicator {
  private readonly numberOfDaysToRest: number;

  constructor(numberOfDaysToRest: number) {
    this.numberOfDaysToRest = numberOfDaysToRest;
  }

  public composeMessage({
    reindeer,
    numberOfDaysBeforeChristmas,
  }: ReindeerTravelDetails): string {
    const daysBeforeReturn = this.daysBeforeReturn(
      reindeer.getNumberOfDaysForComingBack(),
      numberOfDaysBeforeChristmas
    );
    return `Dear ${reindeer.reindeerName}, please return from ${reindeer.currentLocation} in ${daysBeforeReturn} day(s) to be ready and rest before Christmas.`;
  }

  public isReindeerOverdue(
    reindeer: Reindeer,
    numberOfDaysBeforeChristmas: number,
    logger: Logger
  ): boolean {
    if (
      this.daysBeforeReturn(
        reindeer.getNumberOfDaysForComingBack(),
        numberOfDaysBeforeChristmas
      ) <= 0
    ) {
      logger.log(
        `Overdue for ${reindeer.reindeerName} located ${reindeer.currentLocation}.`
      );
      return true;
    }
    return false;
  }

  private daysBeforeReturn(
    numberOfDaysForComingBack: number,
    numberOfDaysBeforeChristmas: number
  ): number {
    return (
      numberOfDaysBeforeChristmas -
      numberOfDaysForComingBack -
      this.numberOfDaysToRest
    );
  }
}
