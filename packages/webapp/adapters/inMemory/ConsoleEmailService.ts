import { EmailService } from "domain/sites/interfaces/EmailService";
import { FairlyticsKey } from "domain/sites/models/FairlyticsKey";

// Sans Mailgun, l'inscription n'a aucun moyen de transmettre la clé : on l'écrit
// dans la console du serveur, d'où le lien du dashboard se récupère à la main.
// `mailSent` retient la dernière clé envoyée, ce qui sert aussi de sonde aux tests.
export class ConsoleEmailService implements EmailService {
  public mailSent: FairlyticsKey | null = null;

  async sendEmail(to: string, key: FairlyticsKey) {
    this.mailSent = key;
    console.log(
      `[adapters in-memory] Clé Fairlytics pour ${to} : dashboard sur /${key.privateKey}, clé publique ${key.publicKey}`
    );
    return {};
  }
}
