import testData from "../../../fixtures/not_full_reports/organizations/QA-5841.fixture";
import { deleteReport } from "../../../actions/base/baseTest.actions";

describe("Verify that changes are displayed for Annual and Monthly Rent columns, # column in the export.", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll", "@check_export" ] }, () => {

    it("Test body", () => {

        cy.login(testData.username, testData.password);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});