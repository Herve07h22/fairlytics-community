import { StatsRepository } from "domain/analytics/interfaces/StatsRepository";
import { EmailService } from "domain/sites/interfaces/EmailService";
import { RandomGenerator } from "domain/sites/interfaces/RandomGenerator";
import { SecureKeyRepository } from "domain/sites/interfaces/SecureKeyRepository";
import { ElasticStatsRepository } from "./ElasticStatsRepository";
import { MaigunEmailService } from "./MaigunEmailService";
import { RandomGeneratorCrypto } from "./RandomGeneratorCrypto";
import { SecureKeyRepositorySql } from "./SecureKeyRepositorySql";
import { ConsoleEmailService } from "./inMemory/ConsoleEmailService";
import {
  DEMO_KEY,
  InMemorySecureKeyRepository,
} from "./inMemory/InMemorySecureKeyRepository";
import { InMemoryStatsRepository } from "./inMemory/InMemoryStatsRepository";

export type Dependencies = {
  secureKeyRepository: SecureKeyRepository;
  randomGenerator: RandomGenerator;
  statsDatatbase: StatsRepository;
  emailService: EmailService;
};

// Sans identifiants Elasticsearch, la stack n'est pas montée : on démarre sur des
// adapters in-memory, de quoi travailler sur la webapp en local.
const withoutElasticsearch =
  !process.env.ELASTIC_USERNAME || !process.env.ELASTIC_PASSWORD;

const productionDependencies = (): Dependencies => ({
  secureKeyRepository: new SecureKeyRepositorySql(),
  randomGenerator: new RandomGeneratorCrypto(),
  statsDatatbase: new ElasticStatsRepository(),
  emailService: new MaigunEmailService(),
});

const inMemoryDependencies = (): Dependencies => {
  console.log(
    `[adapters in-memory] ELASTIC_USERNAME ou ELASTIC_PASSWORD absente : données de démonstration, dashboard sur /${DEMO_KEY.privateKey}`
  );
  return {
    secureKeyRepository: new InMemorySecureKeyRepository(),
    randomGenerator: new RandomGeneratorCrypto(), // node:crypto, aucune infra requise
    statsDatatbase: new InMemoryStatsRepository(),
    emailService: new ConsoleEmailService(),
  };
};

export const dependencies: Dependencies = withoutElasticsearch
  ? inMemoryDependencies()
  : productionDependencies();
