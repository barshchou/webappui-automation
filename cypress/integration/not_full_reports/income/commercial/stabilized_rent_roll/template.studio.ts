describe("Test suite", () => {
    before("Login, create report", () => {
        cy.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    });

    it("Test body", () => {
        //test something
    });
});