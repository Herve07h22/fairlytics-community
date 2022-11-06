import { ElasticStatsRepository } from "./ElasticStatsRepository";
import { RandomGeneratorCrypto } from "./RandomGeneratorCrypto";
import { SecureKeyRepositorySql } from "./SecureKeyRepositorySql";

export const dependencies = {
  secureKeyRepository: new SecureKeyRepositorySql(),
  randomGenerator: new RandomGeneratorCrypto(),
  statsDatatbase: new ElasticStatsRepository(),
};
