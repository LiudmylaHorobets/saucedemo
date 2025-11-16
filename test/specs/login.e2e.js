import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/";

describe("UC-1: Login with empty credentials", () => {
  it('should show error message "Username is required"', async () => {
    await LoginPage.open();

    await LoginPage.typeUsername("any_user");
    await LoginPage.typePassword("any_password");

    await LoginPage.clearFields();

    await LoginPage.submit();

    await expect(LoginPage.errorMessage).toBeDisplayed();

    const errorText = await LoginPage.errorMessage.getText();
    expect(errorText).toContain(
      "Username and password do not match any user in this service"
    );
  });
});
