import HomepageActions from "../../actions/base/homepage.actions";
import * as Users from "../../../cypress.env.json";

Cypress.env("loginMethod", "ui");

describe("Check if user can login", { tags: [ "@smoke" ] }, () => {

    it("Test body", () => {
        cy.loginByUI(Cypress.config().baseUrl, Users.WEBAPP_LEAD_APPRAISER_USERNAME, Users.WEBAPP_LEAD_APPRAISER_PASSWORD); //Cypress.env("USERNAME"), Cypress.env("PASSWORD")
        HomepageActions.Page.createReportButton.should("exist").and("be.visible");
    });
});