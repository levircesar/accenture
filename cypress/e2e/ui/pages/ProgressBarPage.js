export class ProgressBarPage {
  elements = {
    widgetsMenu: () => cy.contains("h5", "Widgets"),
    progressBarMenuItem: () => cy.contains("span.text", "Progress Bar"),
    startStopButton: () => cy.get("#startStopButton"),
    resetButton: () => cy.get("#resetButton"),
    progressBar: () => cy.get("#progressBar"),
    resetButton: () => cy.get("#resetButton"),
    modalTitle: () => cy.get(".modal-title"),
    modalTableValue: (label) => cy.get("td").contains(label).next(),
    closeModalButton: () => cy.get("#closeLargeModal"),
  };

  visit() {
    cy.visit("https://demoqa.com/");
  }

  navigateToProgressBar() {
    this.elements.widgetsMenu().click();
    this.elements.progressBarMenuItem().click();
  }

  clickStartStopButton() {
    this.elements.startStopButton().click();
  }

  assertIfIsStartButton() {
    this.elements.startStopButton().should("have.text", "Start");
  }

  assertIfIsStopButton() {
    this.elements.startStopButton().should("have.text", "Stop");
  }

  clickResetButton() {
    this.elements.resetButton().click();
  }

  clickWindowButton() {
    this.elements.windowButton().click();
  }

  closeModal() {
    this.elements.closeModalButton().click({ force: true });
  }
}
