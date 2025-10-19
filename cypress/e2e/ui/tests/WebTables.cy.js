import { WebTablesPage } from "../pages/WebTablesPage";

describe("Web Tables Test", () => {
  const webTables = new WebTablesPage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    webTables.visit();
  });

  it("Deve Criar um novo registro , editar e depois deletar", () => {
    const userData = {
      firstName: "levir",
      lastName: "lemos",
      email: "levirlemos@gmail.com",
      age: "26",
      salary: "3000",
      department: "QA",
    };
    webTables.navigateToWebTables();

    //criar
    webTables.clickAddNewRecordButton();
    webTables.fillFirstName(userData.firstName);
    webTables.fillLastName(userData.lastName);
    webTables.fillEmail(userData.email);
    webTables.fillAge(userData.age);
    webTables.fillSalary(userData.salary);
    webTables.fillDepartment(userData.department);
    webTables.submitForm();
    webTables.searchBoxByTitle(userData.firstName);

    //editar
    webTables.clickEditButton();
    webTables.clearLastName();
    webTables.fillLastName("Accenture");
    webTables.submitForm();

    //deletar
    webTables.clearSearchBox();
    webTables.searchBoxByTitle(userData.firstName);
    webTables.clickDeleteButton();

    cy.screenshot();
  });
});
