import HomePage from "../pages/HomePage";

describe("Test Playground", () => {
  const homePage = new HomePage();

  it("should click in start button", () => {
    homePage.visit();
    homePage.clickStart();
    cy.contains("Como Começar").should("be.visible");
  });
});
