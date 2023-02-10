import { fillHtmlTemplate } from "../MaigunEmailService";

it("A template can be filled with data", async () => {
  const filledTemplate = fillHtmlTemplate("./adapters/mailgunTemplate.html", {
    publicKey: "1234567",
    tagUrl: "https://app.fairlytics.tech/tag/tag.js",
    dashboardUrl: "https://app.fairlytics.tech/dashboard/987654",
    landingUrl: "https://fairlytics.tech",
  });
  expect(filledTemplate).toMatch(
    /(&lt;script defer id="fairlytics-id-ajcu6jd9k7ysd6" data-fairlyticskey="1234567" src="https:\/\/app.fairlytics.tech\/tag\/tag.js")/i
  );
  expect(filledTemplate).toMatch(/(https:\/\/fairlytics.tech)/i);
  expect(filledTemplate).toMatch(
    /(https:\/\/app.fairlytics.tech\/dashboard\/987654)/i
  );
});
