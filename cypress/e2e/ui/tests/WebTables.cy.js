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


  /*
  Optei por não utilizar o cumcuber pois teria que mudar toda 
  a estrutura do projeto com cypress, afetando o cypress.config.js
  Essa mudança teria que tornar todos os testes adaptados ao cumcuber.
  */
  it("Deve registrar 12 usuários dinâmicos e depois deletar todos", () => {
    const baseName = `UsersTeste`;
    webTables.navigateToWebTables();

    // Criar 12 usuários
    for (let i = 0; i < 12; i++) {
      const userData = {
        firstName: `${baseName}${i}`,
        lastName: "Accenture",
        email: `${baseName}${i}@gmail.com`,
        age: "28",
        salary: "5000",
        department: "QA",
      };
      webTables.clickAddNewRecordButton();
      webTables.fillFirstName(userData.firstName);
      webTables.fillLastName(userData.lastName);
      webTables.fillEmail(userData.email);
      webTables.fillAge(userData.age);
      webTables.fillSalary(userData.salary);
      webTables.fillDepartment(userData.department);
      webTables.submitForm();
    }

    // Deletar os 12 usuários
    for (let i = 0; i < 12; i++) {
      webTables.searchBoxByTitle(`${baseName}${i}`);
      webTables.clickDeleteButton();
      webTables.clearSearchBox();
    }
    
    webTables.searchBoxByTitle(baseName);
    cy.contains("No rows found").should("be.visible");
    cy.screenshot();
  });
});
