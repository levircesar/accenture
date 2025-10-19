import { BrowserWindowsPage } from "../pages/BrowserWindowsPage";

describe("Browser Windows Test", () => {
  const browserWindows = new BrowserWindowsPage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    browserWindows.visit();
  });

  it("Deve abrir e validar a janela", () => {
    browserWindows.navigateToBrowserWindows();

    cy.window().then((win) => {
      cy.stub(win, "open").as("popup"); 
    });

    browserWindows.clickWindowButton();

    cy.get("@popup").then((stub) => {
      const relativeUrl = stub.getCall(0).args[0];

      cy.location("origin").then((origin) => {
        const fullUrl = `${origin}${relativeUrl}`;

        cy.visit(fullUrl);
      });
    });
    cy.contains("This is a sample page").should("be.visible");

    cy.screenshot();

    //Por limitções do cypress não é possível fechar a janela 
    //pois o cypress não interaje com múltiplas janelas.
    //Se o teste fosse em selenium isso seria possível usando o switchTo
  });
});
