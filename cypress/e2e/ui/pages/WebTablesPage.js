export class WebTablesPage {
  elements = {
    elementsMenu: () => cy.contains("h5", "Elements"),
    webTablesMenuItem: () => cy.contains("span.text", "Web Tables"),
    addNewRecordButton: () => cy.get("#addNewRecordButton"),
    closeModalButton: () => cy.get("#closeLargeModal"),
    firstName: () => cy.get("#firstName"),
    lastName: () => cy.get("#lastName"),
    email: () => cy.get("#userEmail"),
    age: () => cy.get("#age"),
    salary: () => cy.get("#salary"),
    department: () => cy.get("#department"),
    submit: () => cy.get("#submit"),
    searchBox: () => cy.get("#searchBox"),
    deleteButton: () => cy.get('span[title="Delete"]'),
    editButton: () => cy.get('span[title="Edit"]'),
  };

  visit() {
    cy.visit("https://demoqa.com/");
  }

  navigateToWebTables() {
    this.elements.elementsMenu().click();
    this.elements.webTablesMenuItem().click();
  }

  clickWindowButton() {
    this.elements.windowButton().click();
  }

  clickAddNewRecordButton() {
    this.elements.addNewRecordButton().click();
  }
  fillFirstName(name) {
    this.elements.firstName().type(name);
  }
  fillLastName(name) {
    this.elements.lastName().type(name);
  }
  clearLastName() {
    this.elements.lastName().clear();
  }
  fillEmail(email) {
    this.elements.email().type(email);
  }
  fillAge(age) {
    this.elements.age().type(age);
  }
  fillSalary(salary) {
    this.elements.salary().type(salary);
  }
  fillDepartment(department) {
    this.elements.department().type(department);
  }
  submitForm() {
    this.elements.submit().click();
  }

  clickDeleteButton() {
    this.elements.deleteButton().first().click();
  }
  clickEditButton() {
    this.elements.editButton().click();
  }

  clearSearchBox() {
    this.elements.searchBox().clear();
  }
  searchBoxByTitle(title) {
    this.elements.searchBox().type(title);
  }

  closeModal() {
    this.elements.closeModalButton().click({ force: true });
  }
}
