import { SecureKeyRepository } from "../interfaces/SecureKeyRepository";
import { FairlyticsKey } from "../models/FairlyticsKey";

export class SecureKeyRepositoryTest implements SecureKeyRepository {
  store: FairlyticsKey[] = [
    {
      privateKey: "private1",
      publicKey: "public1",
      email: "already-registered@test.test",
    },
    { privateKey: "private2", publicKey: "public2", email: null }, // Anonymous user
  ];
  async set(key: FairlyticsKey) {
    this.store.push(key);
  }
  async getPublicKey(privateKey: string) {
    const key = this.store.find((key) => key.privateKey === privateKey);
    if (key) return key.publicKey;
    return null;
  }

  async checkPublicKey(publicKey: string) {
    return Boolean(this.store.find((key) => key.publicKey === publicKey));
  }

  async getKeysByEmail(email: string) {
    return this.store.find((key) => key.email === email) || null;
  }
}
