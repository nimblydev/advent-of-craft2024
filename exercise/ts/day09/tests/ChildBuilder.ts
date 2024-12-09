import { Child } from "../src/child";
import { GiftRequest } from "../src/giftRequest";

export class ChildBuilder {
  private _firstName: string = "DefaultFirstName";
  private _lastName: string = "DefaultLastName";
  private _age: number = 0;
  private _behavior: Behavior = "nice";
  private _giftRequest: GiftRequest = new GiftRequest(
    "DefaultGift",
    true,
    "nice to have"
  );

  withFirstName(firstName: string): this {
    this._firstName = firstName;
    return this;
  }

  withLastName(lastName: string): this {
    this._lastName = lastName;
    return this;
  }

  withAge(age: number): this {
    this._age = age;
    return this;
  }

  withBehavior(behavior: Behavior): this {
    this._behavior = behavior;
    return this;
  }

  whoIsNaughty(): this {
    this._behavior = "naughty";
    return this;
  }

  whoIsNice(): this {
    this._behavior = "nice";
    return this;
  }

  withGiftRequest(giftRequest: GiftRequest): this {
    this._giftRequest = giftRequest;
    return this;
  }

  build(): Child {
    return new Child(
      this._firstName,
      this._lastName,
      this._age,
      this._behavior,
      this._giftRequest
    );
  }
}
