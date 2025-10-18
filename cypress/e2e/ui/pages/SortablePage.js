export class SortablePage {
  elements = {
    interationsMenu: () => cy.contains("h5", "Interactions"),
    sortableMenuItem: () => cy.contains("span.text", "Sortable"),
    listTab: () => cy.get("#demo-tab-list"),
    listContainer: () => cy.get(".vertical-list-container"),
    listItems: () => cy.get(".vertical-list-container .list-group-item"),
  };

  visit() {
    cy.visit("https://demoqa.com/");
  }

  navigateToSortableMenu() {
    this.elements.interationsMenu().click();
    this.elements.sortableMenuItem().click();
  }
  ensureListIsVisible() {
    this.elements.listTab().click();
    this.elements.listContainer().should("be.visible");
  } 

  orderNormalList() { 
    const numberValues = {
      One: 1,
      Two: 2,
      Three: 3,
      Four: 4,
      Five: 5,
      Six: 6,
    };

    const originalTexts = [];
    this.elements
      .listItems()
      .should("have.length.gt", 1)
      .each(($item) => {
        originalTexts.push($item.text());
      })
      .then(() => { 
        const sortedTexts = [...originalTexts].sort((a, b) => {
          return numberValues[a] - numberValues[b];
        });

        cy.log("Ordem numérica crescente desejada:", sortedTexts);  
        sortedTexts.forEach((text, targetIndex) => {
          const sourceElement = this.elements.listItems().contains(text);
          const targetElement = this.elements.listItems().eq(targetIndex);

          sourceElement.trigger("mousedown", { which: 1 });
          targetElement
            .trigger("mousemove", { force: true })
            .trigger("mouseup", { force: true });

          cy.wait(500);
        });

        cy.log("Validando a ordem final dos elementos.");
        this.elements.listItems().each(($item, index) => {
          expect($item.text()).to.equal(sortedTexts[index]);
        });
      });
  }
  orderInverseList() { 
    const numberValues = {
      One: 1,
      Two: 2,
      Three: 3,
      Four: 4,
      Five: 5,
      Six: 6,
    };

    const originalTexts = [];
    this.elements
      .listItems()
      .should("have.length.gt", 1)
      .each(($item) => {
        originalTexts.push($item.text());
      })
      .then(() => {
        
        const sortedTexts = [...originalTexts].sort((a, b) => {
          return numberValues[b] - numberValues[a];
        });

        cy.log("Ordem numérica decrescente desejada:", sortedTexts);  
        sortedTexts.forEach((text, targetIndex) => {
          const sourceElement = this.elements.listItems().contains(text);
          const targetElement = this.elements.listItems().eq(targetIndex);

          sourceElement.trigger("mousedown", { which: 1 });
          targetElement
            .trigger("mousemove", { force: true })
            .trigger("mouseup", { force: true });

          cy.wait(500);
        });

        cy.log("Validando a ordem final dos elementos.");
        this.elements.listItems().each(($item, index) => {
          expect($item.text()).to.equal(sortedTexts[index]);
        });
      });
  }
}
