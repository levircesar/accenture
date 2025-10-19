import { ProgressBarPage } from "../pages/ProgressBarPage";

describe("Progress Bar Test", () => {
  const progressBar = new ProgressBarPage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    progressBar.visit();
  });

  it("Deve clicar no botao de start da progress bar", () => {
    progressBar.navigateToProgressBar();

    progressBar.assertIfIsStartButton();
    progressBar.clickStartStopButton();

    cy.get('div[role="progressbar"]', { timeout: 15000 })
      .should(($progressBar) => {
        const currentValue = parseInt($progressBar.attr("aria-valuenow"));
        expect(currentValue).to.be.gte(25);
      })
      .then(() => {
        cy.log("Chegou nos 25, deve clicar para parar");

        progressBar.assertIfIsStopButton(); 
        progressBar.clickStartStopButton();
      });

    cy.log("Agora continua ate os 100");

    progressBar.assertIfIsStartButton();
    progressBar.clickStartStopButton();

    cy.get('div[role="progressbar"]', { timeout: 30000 })
      .should(($progressBar) => {
        const currentValue = parseInt($progressBar.attr("aria-valuenow"));
        expect(currentValue).to.be.gte(100);
      })
      .then(() => {
        cy.log("Chegou nos 100, deve clicar para resetar");
        progressBar.clickResetButton();
      });
    cy.screenshot();
  });
});
