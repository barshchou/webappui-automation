import testData from "../../../../fixtures/not_full_reports/report/client/QA-4649.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";
import Summary from "../../../../actions/property/summary.actions";
import { Tag } from "../../../../utils/tags.utils";

describe("Verify the Save & Continue button functionality on the Report > Client page", 
    { tags: [ Tag.report, Tag.client ] }, () => {
        
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
  
        cy.stepInfo(`3. Verify that the changes are saved and the user is redirected to the next page (Property > Summary).`);
        Summary.verifyThatPageIsOpened();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});