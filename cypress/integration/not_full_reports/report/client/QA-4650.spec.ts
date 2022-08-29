import testData from "../../../../fixtures/not_full_reports/report/client/QA-4650.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";
import routesUtils from "../../../../utils/routes.utils";

describe("Verify the Client Guidelines Discussion on the page", 
    { tags: [ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Fill in the editable fields with values and do NOT click on the Save button.`);
            NavigationSection.navigateToClientPage();
            Report.Client.enterClientName(testData.clientName).
                enterClientFileNumber(testData.clientFileNumber);

            cy.stepInfo(`2. Try to proceed on any other page and verify that the Unsaved changes modal is displayed.`);
            NavigationSection.clickReportButton()
                .clickReportInfoButton()
                .verifyUnsavedChangesModal();

            cy.stepInfo(`3. Click on the Yes button and verify that the changes are saved on the Client page.`);
            NavigationSection.clickYesButton()
                .waitForUrl(routesUtils.keyInfo)
                .navigateToClientPage();

            cy.stepInfo(`4. Repeat step 1, try to proceed on any other page from the Client page 
        and verify that the Unsaved changes modal is displayed.`);
            Report.Client.enterClientName(testData.clientName).
                enterClientFileNumber(testData.clientFileNumber+"_UNSAVED");
            NavigationSection.clickReportButton()
                .clickReportInfoButton()
                .verifyUnsavedChangesModal();

            cy.stepInfo(`5. Click on the No button and verify that the changes are NOT saved on the Client page.`);
            NavigationSection.clickNoButton()
                .waitForUrl(routesUtils.keyInfo)
                .navigateToClientPage();
            Report.Client.verifyInputChangesToBeUnsaved(testData.clientFileNumber);
        });
    });