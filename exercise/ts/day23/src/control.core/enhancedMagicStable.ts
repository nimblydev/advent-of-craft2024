import { MagicStable } from "../external/stable/magicStable";
import { AmplifierType } from "./amplifierType";
import { MagicPowerAmplifier } from "./magicPowerAmplifier";

export class EnhancedMagicStable extends MagicStable {
  private readonly _magicPowerAmplifierStock: Array<MagicPowerAmplifier> = [];

  constructor() {
    super();

    this._magicPowerAmplifierStock.push(
      new MagicPowerAmplifier(AmplifierType.BLESSED)
    );
    this._magicPowerAmplifierStock.push(
      new MagicPowerAmplifier(AmplifierType.BLESSED)
    );
    this._magicPowerAmplifierStock.push(
      new MagicPowerAmplifier(AmplifierType.DIVINE)
    );
  }

  get magicPowerAmplifiersStock(): Array<MagicPowerAmplifier> {
    return this._magicPowerAmplifierStock;
  }

  getTheBestMagicPowerAmplifier(): MagicPowerAmplifier {
    if (this.magicPowerAmplifiersStock.length === 0) {
      return new MagicPowerAmplifier(AmplifierType.BASIC);
    }
    return this.magicPowerAmplifiersStock
      .sort(this.descendingOrderAmplifierType)
      .pop();
  }

  private descendingOrderAmplifierType(
    a: MagicPowerAmplifier,
    b: MagicPowerAmplifier
  ): number {
    if (a.equals(b)) return 0;
    return a.isBetterThan(b) ? 1 : -1;
  }
}
