import { KeyAlreadyExistsError } from "../errors/KeyAlreadyExistError";
import { RandomGenerator } from "../interfaces/RandomGenerator";
import { SecureKeyRepository } from "../interfaces/SecureKeyRepository";
import { FairlyticsKey } from "../models/FairlyticsKey";
import { Result } from "../../helpers/Result";

export async function register(dependencies: {
  secureKeyRepository: SecureKeyRepository;
  randomGenerator: RandomGenerator;
}): Promise<Result<FairlyticsKey>> {
  const newKey = await makeFairlyticsKey(dependencies.randomGenerator);

  if (await alreadyUsed(newKey, dependencies.secureKeyRepository))
    return new KeyAlreadyExistsError();

  await dependencies.secureKeyRepository.set(newKey);

  return { value: newKey };
}

async function alreadyUsed(
  newKey: FairlyticsKey,
  secureKeyRepository: SecureKeyRepository
) {
  const privateKeyalreadyExists = Boolean(
    await secureKeyRepository.getPublicKey(newKey.privateKey)
  );
  const publicKeyalreadyExists = await secureKeyRepository.checkPublicKey(
    newKey.publicKey
  );

  const publicKeyAlreadyUsedAsPrivate = await secureKeyRepository.getPublicKey(
    newKey.publicKey
  );

  return (
    privateKeyalreadyExists ||
    publicKeyalreadyExists ||
    publicKeyAlreadyUsedAsPrivate
  );
}

// Stay away from IO crypto generator with an interface
export async function makeFairlyticsKey(
  randomGenerator: RandomGenerator
): Promise<FairlyticsKey> {
  return {
    privateKey: await randomGenerator.makeRandomString(),
    publicKey: await randomGenerator.makeRandomString(),
  };
}
