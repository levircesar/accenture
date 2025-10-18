export class BrowserWindowsPage {
  elements = {
    alertsMenu: () => cy.contains("h5", "Alerts, Frame & Windows"),
    browserWindowsMenuItem: () => cy.contains("span.text", "Browser Windows"),
    windowButton: () => cy.get("#windowButton"), 
    modalTitle: () => cy.get(".modal-title"),
    modalTableValue: (label) => cy.get("td").contains(label).next(),
    closeModalButton: () => cy.get("#closeLargeModal"),
  };

  visit() {
    cy.visit("https://demoqa.com/");
  }

  navigateToBrowserWindows() {
    this.elements.alertsMenu().click();
    this.elements.browserWindowsMenuItem().click();
  }
 
  clickWindowButton() {
    this.elements.windowButton().click();
  }



  closeModal() {
    this.elements.closeModalButton().click({ force: true });
  }
}
