import { SecureKeyRepositorySql } from "../SecureKeyRepositorySql";
import fs from "fs/promises";

it("A new key can be stored in the database", async () => {
  await fs
    .unlink("test.db")
    .catch(() => "File test.db doesnt exist. Skipping.");
  const repo = new SecureKeyRepositorySql("test.db");
  await repo.set({
    publicKey: "test-public",
    privateKey: "test-private",
    email: "fairlytics&test.test",
  });
  const retrievedPublicKey = await repo.getPublicKey("test-private");
  expect(retrievedPublicKey).toBe("test-public");
});
