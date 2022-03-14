import testData from "../../../../fixtures/not_full_reports/report/client/QA-4649.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";

describe("Verify the Save & Continue button functionality on the Report > Client page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. The Save & Continue button is displayed on the Client page.`);
        NavigationSection.navigateToClientPage();
        Report.Client.Page.SaveAndContinueBtn.should("be.visible");

        cy.stepInfo(`2. Fill in the editable fields with values and click on the Save & Continue button.`);
        Report.Client.enterClientName(testData.clientName).
        enterClientFileNumber(testData.clientFileNumber)
        .clickSaveContinueButton();
        /**
         * test body
         */
        cy.stepInfo(`Verify that the changes are saved and the user is redirected to the next page (Property > Summary).`);
        cy.get('[data-qa="summary"]').should("exist");
        cy.url().then(url=>{
            let orlObj = new URL(url);
            cy.log("Check whether current URL ends with '/property-summary'");
            cy.wrap(orlObj.pathname.endsWith("/property-summary")).should("be.true");
        })
        deleteReport(testData.reportCreationData.reportNumber);
    });
});