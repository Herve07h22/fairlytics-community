import { ConsoleEmailService } from "adapters/inMemory/ConsoleEmailService";
import { InMemorySecureKeyRepository } from "adapters/inMemory/InMemorySecureKeyRepository";
import { KeyAlreadyExistsError } from "../errors/KeyAlreadyExistError";
import { RandomGenerator } from "../interfaces/RandomGenerator";
import { SecureKeyRepository } from "../interfaces/SecureKeyRepository";
import { register } from "../usecases/register";
import { RandomGeneratorTest } from "./RandomGeneratorTest";

var dependencies: {
  secureKeyRepository: SecureKeyRepository;
  emailService: ConsoleEmailService;
  randomGenerator: RandomGenerator;
};

beforeAll(() => {
  dependencies = {
    // On seede explicitement le dépôt plutôt que de laisser l'adapter tomber sur
    // son store global partagé, pour que ces cas restent isolés.
    secureKeyRepository: new InMemorySecureKeyRepository([
      {
        privateKey: "private1",
        publicKey: "public1",
        email: "already-registered@test.test",
      },
      { privateKey: "private2", publicKey: "public2", email: null },
    ]),
    emailService: new ConsoleEmailService(),
    randomGenerator: new RandomGeneratorTest("xxx", "yyy"),
  };
});

it("A private key which is already in the store should not be registered", async () => {
  const result = await register("new-user@test.test", {
    ...dependencies,
    randomGenerator: new RandomGeneratorTest("private1", "new-public"),
  });
  expect(result instanceof KeyAlreadyExistsError).toBe(true);
});

it("A public key which is already in the store should not be registered", async () => {
  const result = await register("new-user@test.test", {
    ...dependencies,
    randomGenerator: new RandomGeneratorTest("new-private", "public1"),
  });
  expect(result instanceof KeyAlreadyExistsError).toBe(true);
});

it("A public key should not match any private key", async () => {
  const result = await register("new-user@test.test", {
    ...dependencies,
    randomGenerator: new RandomGeneratorTest("new-private", "private1"),
  });
  expect(result instanceof KeyAlreadyExistsError).toBe(true);
});

it("An already registered user should just get the existing keys by email", async () => {
  await register("already-registered@test.test", dependencies);
  expect(dependencies.emailService.mailSent).toEqual({
    privateKey: "private1",
    publicKey: "public1",
    email: "already-registered@test.test",
  });
});

it("A new tuple of keys should be accepted as a valid result", async () => {
  await register("new-user@test.test", {
    ...dependencies,
    randomGenerator: new RandomGeneratorTest("new-private", "new-public"),
  });
  expect(dependencies.emailService.mailSent).toEqual({
    privateKey: "new-private",
    publicKey: "new-public",
    email: "new-user@test.test",
  });
});
