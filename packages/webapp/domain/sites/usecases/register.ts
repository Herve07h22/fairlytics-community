import { KeyAlreadyExistsError } from "../errors/KeyAlreadyExistError";
import { RandomGenerator } from "../interfaces/RandomGenerator";
import { SecureKeyRepository } from "../interfaces/SecureKeyRepository";
import { FairlyticsKey } from "../models/FairlyticsKey";
import { Result } from "../../helpers/Result";
import { EmailService } from "../interfaces/EmailService";

export async function register(
  email: string | null,
  dependencies: {
    secureKeyRepository: SecureKeyRepository;
    randomGenerator: RandomGenerator;
    emailService: EmailService;
  }
): Promise<Result<void>> {
  const keysOfAlreadyRegisteredUser =
    email && (await dependencies.secureKeyRepository.getKeysByEmail(email));

  if (keysOfAlreadyRegisteredUser) {
    return dependencies.emailService.sendEmail(
      email,
      keysOfAlreadyRegisteredUser
    );
  }

  const newKey = await makeFairlyticsKey(dependencies.randomGenerator, email);

  if (await alreadyUsed(newKey, dependencies.secureKeyRepository))
    return new KeyAlreadyExistsError();

  await dependencies.secureKeyRepository.set(newKey);

  if (email) {
    return dependencies.emailService.sendEmail(email, newKey);
  }

  return {};
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
  randomGenerator: RandomGenerator,
  email: string | null
): Promise<FairlyticsKey> {
  return {
    privateKey: await randomGenerator.makeRandomString(),
    publicKey: await randomGenerator.makeRandomString(),
    email,
  };
}
