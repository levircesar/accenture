describe('API Test', () => {
    it('should get a 200 response and validate the success property', () => {
        cy.request(
          "https://test-playground-theta.vercel.app/api/analytics"
        ).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.success).to.be.true;
          cy.log('API Response:', JSON.stringify(response.body));
          console.log('API Response:', response.body);
        });
    });
});
