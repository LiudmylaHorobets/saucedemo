describe("SauceDemo login page", () => {
  it("should open the login page and have correct title", async () => {
    const expectedTitle = "Swag Labs";

    await browser.url("/");
    await expect(browser).toHaveTitle(expectedTitle);
  });
});
