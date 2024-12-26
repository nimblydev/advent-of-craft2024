import { IEvent } from "./IEvent";
import { IAggregate } from "./IAggregate";
import { number, string } from "fp-ts";

export abstract class EventSourcedAggregate implements IAggregate {
  get version(): number {
    return this._version;
  }
  private bufferedEvents: IEvent[] = [];
  private r: Map<string, (event: IEvent) => void> = new Map();

  private readonly timeProvider: () => Date;

  protected id: string;

  getId = (): string => this.id;

  private _version: number = 0;

  protected constructor(timeProvider: () => Date) {
    this.timeProvider = timeProvider;
    this.registerRoutes();
  }

  protected abstract registerRoutes(): void;

  applyEvent = (event: IEvent): void => {
    const handler = this.r.get(event.constructor.name);
    if (handler) {
      handler(event);
      this._version++;
    }
  };

  protected registerEventRoute = <TEvent extends IEvent>(
    eventType: new (...args: any[]) => TEvent,
    apply: (event: TEvent) => void
  ): void => {
    this.r.set(eventType.name, (event: IEvent) => apply(event as TEvent));
  };

  getUncommittedEvents = (): IEvent[] => [...this.bufferedEvents];
  clearUncommittedEvents = (): void => {
    this.bufferedEvents = [];
  };

  protected raiseEvent = (event: IEvent): void => {
    this.applyEvent(event);
    this.bufferedEvents.push(event);
  };

  protected time = (): Date => this.timeProvider();
}
