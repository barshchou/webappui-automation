import HomepageActions from "../../actions/base/homepage.actions";

Cypress.env("loginMethod", "ui");

describe("Check if user can login", { tags: [ "@smoke" ] }, () => {

    it("Test body", () => {
        cy.loginByUI(Cypress.config().baseUrl, Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
        HomepageActions.Page.createReportButton.should("exist").and("be.visible");
    });
});