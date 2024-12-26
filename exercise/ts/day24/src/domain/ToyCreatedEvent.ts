import { IEvent } from "./core/IEvent";
import { StockUnit } from "./StockUnit";
import { v4 as uuidv4 } from "uuid";
export class ToyCreatedEvent implements IEvent {
  constructor(
    public id: string = uuidv4(),
    public date: Date = new Date(),
    public name: string,
    public stock: StockUnit,
    public version: number = 1
  ) {}
}
