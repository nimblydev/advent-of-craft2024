import { Event } from "./core/Event";
import { StockUnit } from "./StockUnit";

export class StockReducedEvent extends Event {
  constructor(
    public id: string,
    public date: Date,
    public itemName: string,
    public newStock: StockUnit
  ) {
    super(id, 1, date);
  }
}
