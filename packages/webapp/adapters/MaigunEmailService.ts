import { EmailService } from "domain/sites/interfaces/EmailService";
import { FairlyticsKey } from "domain/sites/models/FairlyticsKey";
import formData from "form-data";
import Mailgun from "mailgun.js";
import Client from "mailgun.js/client";
import fs from "fs";
import path from "path";

type EmailParameters = {
  publicKey: string;
  tagUrl: string;
  dashboardUrl: string;
  landingUrl: string;
};

export class MaigunEmailService implements EmailService {
  private domain: string;
  private sender: string;
  private fairlyticsUrl: string;
  private fairlyticsLandingPageUrl: string;
  private templateFile: string;
  private mgClient: Client;

  constructor() {
    const key = assertEnvIsSet("MAILGUN_API_KEY");
    const url = assertEnvIsSet("MAILGUN_URL");
    this.domain = assertEnvIsSet("MAILGUN_DOMAIN");
    this.sender = assertEnvIsSet("MAILGUN_SENDER");
    this.templateFile = assertEnvIsSet("MAILGUN_TEMPLATE");
    this.fairlyticsUrl = assertEnvIsSet("FAIRLYTICS_URL");
    this.fairlyticsLandingPageUrl = assertEnvIsSet(
      "FAIRLYTICS_LANDINGPAGE_URL"
    );

    const mailgun = new Mailgun(formData);
    this.mgClient = mailgun.client({ username: "api", key, url });
  }

  async sendEmail(to: string, key: FairlyticsKey) {
    let messageData = {
      from: this.sender,
      to,
      bcc: this.sender,
      subject: "Voici vos identifiants Fairlytics",
      html: fillHtmlTemplate(this.templateFile, {
        publicKey: key.publicKey,
        tagUrl: `${this.fairlyticsUrl}/tag/tag.js`,
        dashboardUrl: `${this.fairlyticsUrl}/dashboard/${key.privateKey}`,
        landingUrl: this.fairlyticsLandingPageUrl,
      }),
    };

    return this.mgClient.messages
      .create(this.domain, messageData)
      .then((_) => ({}))
      .catch((error) => ({ error: JSON.stringify(error) }));
  }
}

function assertEnvIsSet(key: string): string {
  const value = process.env[key];
  if (!value)
    throw new Error(`Error : ${key} key should be set in the .env file`);
  return value;
}

export function fillHtmlTemplate(
  filename: string,
  parameters: EmailParameters
): string {
  const template = fs.readFileSync(path.resolve(filename), "utf8");
  if (!template)
    throw new Error(`Error : cannot find the template file ${filename}`);
  return (Object.keys(parameters) as Array<keyof typeof parameters>).reduce(
    (updatedTemplate, key) =>
      updatedTemplate.replaceAll("{{" + key + "}}", parameters[key]),
    template
  );
}
