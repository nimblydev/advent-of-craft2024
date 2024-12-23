import { AmplifierType } from "./amplifierType";

export class MagicPowerAmplifier {
  private readonly amplifierType: AmplifierType;

  constructor(amplifierType: AmplifierType) {
    this.amplifierType = amplifierType;
  }

  public amplify(magicPower: number): number {
    return magicPower > 0 ? magicPower * this.amplifierType : magicPower;
  }

  public equals(amplifier: MagicPowerAmplifier): boolean {
    return this.amplifierType === amplifier.amplifierType;
  }

  public isBetterThan(amplifier: MagicPowerAmplifier): boolean {
    return this.amplifierType > amplifier.amplifierType;
  }
}
