import { Result } from "domain/helpers/Result";
import { FairlyticsKey } from "../models/FairlyticsKey";

export interface EmailService {
  sendEmail: (to: string, key: FairlyticsKey) => Promise<Result<void>>;
}
