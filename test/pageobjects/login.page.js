class LoginPage {
  get inputUsername() {
    return $("#user-name");
  }

  get inputPassword() {
    return $("#password");
  }

  get btnLogin() {
    return $("#login-button");
  }

  get errorMessage() {
    return $('[data-test="error"]');
  }

  async open() {
    await browser.url("https://www.saucedemo.com/");
    await browser.maximizeWindow();
    await this.inputUsername.waitForDisplayed();
  }

  async clickLogin() {
    await this.btnLogin.click();
  }

  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.clickLogin();
  }

  async typeAndClearCredentials() {
    await this.inputUsername.setValue("any_user");
    await this.inputPassword.setValue("any_password");

    await this.inputUsername.setValue("");
    await this.inputPassword.setValue("");
  }

  async typeUsernameAndClearPassword() {
    await this.inputUsername.setValue("any_user");
    await this.inputPassword.setValue("any_password");
    await this.inputPassword.clearValue();
  }

  async getErrorText() {
    await this.errorMessage.waitForDisplayed();
    return await this.errorMessage.getText();
  }
}

export default new LoginPage();
