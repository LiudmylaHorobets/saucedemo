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
  }

  async clickLogin() {
    await this.btnLogin.click();
  }

  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.clickLogin();
  }

  async getErrorText() {
    await this.errorMessage.waitForDisplayed();
    return this.errorMessage.getText();
  }
}

export default new LoginPage();
