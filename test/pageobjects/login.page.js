class LoginPage {
  get inputUsername() {
    return $("//input[@id='user-name']");
  }

  get inputPassword() {
    return $("//input[@id='password']");
  }

  get btnLogin() {
    return $("//input[@id='login-button']");
  }

  get errorMessage() {
    return $("//h3[@data-test='error']");
  }

  async open() {
    await browser.url("/");
  }

  async typeUsername(value) {
    await this.inputUsername.setValue(value);
  }

  async typePassword(value) {
    await this.inputPassword.setValue(value);
  }

  async clearFields() {
    await this.inputUsername.clearValue();
    await this.inputPassword.clearValue();
  }

  async submit() {
    await this.btnLogin.click();
  }
}

export default new LoginPage();
