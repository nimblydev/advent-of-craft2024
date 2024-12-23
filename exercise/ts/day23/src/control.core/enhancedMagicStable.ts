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
}
