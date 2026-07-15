import { SecureKeyRepository } from "domain/sites/interfaces/SecureKeyRepository";
import { FairlyticsKey } from "domain/sites/models/FairlyticsKey";

// La clé de démonstration donne accès au dashboard local sur /demo, sans passer
// par l'inscription. Les clés créées ensuite ne survivent pas au redémarrage.
export const DEMO_KEY: FairlyticsKey = {
  privateKey: "demo",
  publicKey: "demo-public-key",
  email: "demo@fairlytics.tech",
};

// Next bundle chaque route d'API séparément : sans store partagé par le process,
// une clé créée par /api/register resterait invisible depuis /api/get_stats.
type KeyStoreRegistry = typeof globalThis & { fairlyticsKeys?: FairlyticsKey[] };

const processWideKeyStore = (): FairlyticsKey[] => {
  const registry = globalThis as KeyStoreRegistry;
  if (!registry.fairlyticsKeys) registry.fairlyticsKeys = [DEMO_KEY];
  return registry.fairlyticsKeys;
};

export class InMemorySecureKeyRepository implements SecureKeyRepository {
  constructor(private keys: FairlyticsKey[] = processWideKeyStore()) {}

  async set(key: FairlyticsKey) {
    this.keys.push(key);
  }

  async getKeysByEmail(email: string) {
    return this.keys.find((key) => key.email === email) || null;
  }

  async getPublicKey(privateKey: string) {
    return (
      this.keys.find((key) => key.privateKey === privateKey)?.publicKey || null
    );
  }

  async checkPublicKey(publicKey: string) {
    return this.keys.some((key) => key.publicKey === publicKey);
  }
}
