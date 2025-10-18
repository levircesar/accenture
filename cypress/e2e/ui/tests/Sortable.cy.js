import { SortablePage } from "../pages/SortablePage";

describe("Sortable - Padrão Page Object", () => {
  const sortablePage = new SortablePage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    sortablePage.visit();
  });

  it("Deve ordenar a lista em ordem numérica crescente", () => {
    sortablePage.navigateToSortableMenu();
    sortablePage.ensureListIsVisible();
    sortablePage.orderNormalList();
    cy.screenshot("lista-crescente");
  });

  it("Deve ordenar a lista numérica decrescente", () => {
    sortablePage.navigateToSortableMenu();
    sortablePage.ensureListIsVisible();
    sortablePage.orderInverseList();
    cy.screenshot("lista-decrescente");
  });
});
