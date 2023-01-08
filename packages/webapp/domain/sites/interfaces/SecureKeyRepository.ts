import { FairlyticsKey } from "../models/FairlyticsKey";

export interface SecureKeyRepository {
  set: (key: FairlyticsKey) => Promise<void>;
  getKeysByEmail: (email: string) => Promise<FairlyticsKey | null>;
  getPublicKey: (secretKey: string) => Promise<string | null>;
  checkPublicKey: (publicKey: string) => Promise<boolean>;
}
