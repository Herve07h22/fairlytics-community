import { EmailService } from "../interfaces/EmailService";
import { FairlyticsKey } from "../models/FairlyticsKey";

export class EmailServiceTest implements EmailService {
  public mailSent: FairlyticsKey | null = null;
  async sendEmail(to: string, key: FairlyticsKey) {
    if (to === "bad-email") {
      return { error: "Error" };
    }
    this.mailSent = key;
    return {}; // No result expected if email correctly sent
  }
}
