const { randomFillSync } = require("node:crypto");
const { Buffer } = require("node:buffer");
import { RandomGenerator } from "domain/sites/interfaces/RandomGenerator";

export class RandomGeneratorCrypto implements RandomGenerator {
  async makeRandomString(size: number = 16) {
    const buf = Buffer.alloc(size);
    return randomFillSync(buf).toString("hex");
  }
}
