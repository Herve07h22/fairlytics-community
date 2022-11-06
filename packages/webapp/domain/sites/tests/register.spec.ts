import { KeyAlreadyExistsError } from "../errors/KeyAlreadyExistError";
import { register } from "../usecases/register";
import { RandomGeneratorTest } from "./RandomGeneratorTest";
import { SecureKeyRepositoryTest } from "./SecureKeyRepositoryTest";

it("A private key which is already in the store should not be registered", async () => {
  const result = await register({
    secureKeyRepository: new SecureKeyRepositoryTest(),
    randomGenerator: new RandomGeneratorTest("private1", "new-public"),
  });
  expect(result instanceof KeyAlreadyExistsError).toBe(true);
});

it("A public key which is already in the store should not be registered", async () => {
  const result = await register({
    secureKeyRepository: new SecureKeyRepositoryTest(),
    randomGenerator: new RandomGeneratorTest("new-private", "public1"),
  });
  expect(result instanceof KeyAlreadyExistsError).toBe(true);
});

it("A public key should not match any private key", async () => {
  const result = await register({
    secureKeyRepository: new SecureKeyRepositoryTest(),
    randomGenerator: new RandomGeneratorTest("new-private", "private1"),
  });
  expect(result instanceof KeyAlreadyExistsError).toBe(true);
});

it("A new tuple of keys should be accepted as a valid result", async () => {
  const result = await register({
    secureKeyRepository: new SecureKeyRepositoryTest(),
    randomGenerator: new RandomGeneratorTest("new-private", "new-public"),
  });
  expect(result).toEqual({
    value: {
      privateKey: "new-private",
      publicKey: "new-public",
    },
  });
});
