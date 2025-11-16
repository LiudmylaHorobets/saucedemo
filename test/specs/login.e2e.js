import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page";
import logger from "@wdio/logger";

const log = logger("LoginSpecs");

const validUsers = [
  { username: "standard_user", description: "Standard User" },
  { username: "problem_user", description: "Problem User" },
  {
    username: "performance_glitch_user",
    description: "Performance Glitch User",
  },
];

describe("SauceDemo Login Form", () => {
  it('UC-1: should show error message "Username is required"', async () => {
    log.info("UC-1: Open login page");
    await LoginPage.open();

    const uBefore = await LoginPage.inputUsername.getValue();
    const pBefore = await LoginPage.inputPassword.getValue();
    log.info(
      `UC-1 before click -> username: "${uBefore}", password: "${pBefore}"`
    );

    log.info("UC-1: Click Login button");
    await LoginPage.clickLogin();

    await expect(LoginPage.errorMessage).toBeDisplayed();

    const errorText = await LoginPage.getErrorText();
    log.info(`UC-1 error text: ${errorText}`);

    expect(errorText).toContain("Username is required");
  });

  it('UC-2: should show error message "Password is required"', async () => {
    log.info("UC-2: Open login page");
    await LoginPage.open();

    log.info("UC-2: Type ONLY username, leave password EMPTY");
    await LoginPage.inputUsername.setValue("any_user");

    const uBefore = await LoginPage.inputUsername.getValue();
    const pBefore = await LoginPage.inputPassword.getValue();
    log.info(
      `UC-2 before click -> username: "${uBefore}", password: "${pBefore}"`
    );

    log.info("UC-2: Click Login button");
    await LoginPage.clickLogin();

    await expect(LoginPage.errorMessage).toBeDisplayed();

    const errorText = await LoginPage.getErrorText();
    log.info(`UC-2 error text: ${errorText}`);

    expect(errorText).toContain("Password is required");
  });

  validUsers.forEach(({ username, description }) => {
    it(`UC-3: should login successfully for ${description}`, async () => {
      log.info(`UC-3: Open login page for user: ${username}`);
      await LoginPage.open();

      log.info(`UC-3: Type valid credentials for ${username}`);
      await LoginPage.login(username, "secret_sauce");

      log.info("UC-3: Validate dashboard title 'Swag Labs'");
      await expect(browser).toHaveTitle("Swag Labs");
    });
  });
});
