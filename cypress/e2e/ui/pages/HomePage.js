class HomePage {

    elements ={

        start : () => cy.get('[data-testid="pp:layout|header|btn|comecar"]'),
 
    }
 
    visit() {
        cy.visit("https://test-playground-theta.vercel.app/");
    }

    clickStart() {
        this.elements.start().click();
    }

}

export default HomePage;
