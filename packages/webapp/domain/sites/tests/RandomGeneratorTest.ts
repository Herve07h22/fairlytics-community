import { RandomGenerator } from "../interfaces/RandomGenerator";

export class RandomGeneratorTest implements RandomGenerator {
  static nbOfCalls = 0;
  constructor(public firstCall: string, public secondCall: string) {}
  async makeRandomString() {
    const result =
      RandomGeneratorTest.nbOfCalls % 2 ? this.secondCall : this.firstCall;
    RandomGeneratorTest.nbOfCalls++;
    return result;
  }
}
