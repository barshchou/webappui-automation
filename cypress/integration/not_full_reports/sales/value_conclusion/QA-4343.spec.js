import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4343.fixture";
import Homepage from "../../../../actions/base/homepage.actions";

describe("Save & Continue button test", () => {
    before("Login action", () => {
        cy.login();
        Homepage.createReport();
    });
});