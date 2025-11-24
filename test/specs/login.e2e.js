import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page";
import { validUsers } from "../data/users";
import { ERROR_MESSAGES } from "../data/messages";
import logger from "@wdio/logger";

const log = logger("LoginSpecs");

describe("SauceDemo Login Form", () => {
  it('UC-1: should show error message "Username is required"', async () => {
    log.info("UC-1: Open login page");
    await LoginPage.open();

    log.info("UC-1: Type any credentials into both fields and then clear them");
    await LoginPage.typeAndClearCredentials();

    await expect(LoginPage.inputUsername).toHaveValue("");
    await expect(LoginPage.inputPassword).toHaveValue("");

    const uBefore = await LoginPage.inputUsername.getValue();
    const pBefore = await LoginPage.inputPassword.getValue();
    log.info(
      `UC-1 before click -> username: "${uBefore}", password: "${pBefore}"`
    );

    log.info("UC-1: Click Login button");
    await LoginPage.clickLogin();

    const errorText = await LoginPage.getErrorText();
    log.info(`UC-1 error text: ${errorText}`);

    expect(errorText).toContain("Username is required");
  });

  it('UC-2: should show error message "Password is required"', async () => {
    log.info("UC-2: Open login page");
    await LoginPage.open();

    log.info("UC-2: Type username and password, then clear ONLY password");
    await LoginPage.typeUsernameAndClearPassword();

    const uBefore = await LoginPage.inputUsername.getValue();
    const pBefore = await LoginPage.inputPassword.getValue();
    log.info(
      `UC-2 before click -> username: "${uBefore}", password: "${pBefore}"`
    );

    log.info("UC-2: Click Login button");
    await LoginPage.clickLogin();

    const errorText = await LoginPage.getErrorText();
    log.info(`UC-2 error text: ${errorText}`);

    expect(errorText).toContain(ERROR_MESSAGES.PASSWORD_REQUIRED);
  });

  validUsers.forEach(({ username, description }) => {
    it(`UC-3: should login successfully for ${description}`, async () => {
      log.info(`UC-3: Open login page for user: ${username}`);
      await LoginPage.open();

      log.info(`UC-3: Type valid credentials for ${username}`);
      await LoginPage.login(username, "secret_sauce");

      log.info("UC-3: Wait until user is on inventory page");
      await browser.waitUntil(
        async () => (await browser.getUrl()).includes("/inventory.html"),
        {
          timeout: 5000,
          timeoutMsg: "Expected to be on inventory page after login",
        }
      );

      log.info("UC-3: Validate dashboard title 'Swag Labs'");
      await expect(browser).toHaveTitle("Swag Labs");
    });
  });
});
