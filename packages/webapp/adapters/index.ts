import { ElasticStatsRepository } from "./ElasticStatsRepository";
import { MaigunEmailService } from "./MaigunEmailService";
import { RandomGeneratorCrypto } from "./RandomGeneratorCrypto";
import { SecureKeyRepositorySql } from "./SecureKeyRepositorySql";

export const dependencies = {
  secureKeyRepository: new SecureKeyRepositorySql(),
  randomGenerator: new RandomGeneratorCrypto(),
  statsDatatbase: new ElasticStatsRepository(),
  emailService: new MaigunEmailService(),
};
