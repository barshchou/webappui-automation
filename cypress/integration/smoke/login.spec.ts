import HomepageActions from "../../actions/base/homepage.actions";

describe("Check if user can login", { tags: [ "@smoke" ] }, () => {

    it("Test body", () => {
        cy.loginByUI(Cypress.config().baseUrl);
        HomepageActions.Page.createReportButton.should("exist").and("be.visible");
    });
});