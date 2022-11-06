import { SecureKeyRepository } from "domain/sites/interfaces/SecureKeyRepository";
import { FairlyticsKey } from "domain/sites/models/FairlyticsKey";
import BetterSqlite3 from "better-sqlite3";

export class SecureKeyRepositorySql implements SecureKeyRepository {
  private db: BetterSqlite3.Database;

  constructor(dbName = "fairlytics.db") {
    this.db = BetterSqlite3(process.env.FAIRLYTICS_SQLITE_DB || dbName);
    // check if table "fairlytics_keys" exists
    const createTableStatement = this.db.prepare(
      "CREATE TABLE IF NOT EXISTS fairlytics_keys ( public_key TEXT PRIMARY_KEY, private_key TEXT NOT NULL UNIQUE)"
    );
    createTableStatement.run();
  }

  async set(key: FairlyticsKey) {
    const insertStatement = this.db.prepare(
      "INSERT INTO fairlytics_keys (public_key, private_key) VALUES (?, ?)"
    );
    const info = insertStatement.run(key.publicKey, key.privateKey);
  }

  async getPublicKey(secretKey: string) {
    const getPublicKeyStatement = this.db.prepare(
      "SELECT * FROM fairlytics_keys WHERE private_key=?"
    );
    const getPublicKeyStatementResult = getPublicKeyStatement.get(secretKey);
    return getPublicKeyStatementResult?.public_key;
  }

  async checkPublicKey(publicKey: string) {
    const getPublicKeyStatement = this.db.prepare(
      "SELECT public_key FROM fairlytics_keys WHERE public_key = ?"
    );
    const publicKeyAlreadyUsed = getPublicKeyStatement.get(publicKey);
    return !!publicKeyAlreadyUsed?.public_key;
  }
}
