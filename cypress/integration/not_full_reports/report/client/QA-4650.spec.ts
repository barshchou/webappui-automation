import testData from "../../../../fixtures/not_full_reports/report/client/QA-4650.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";

describe("Verify the Client Guidelines Discussion on the page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToClientPage();
        Report.Client.enterClientName(testData.clientName).
        enterClientFileNumber(testData.clientFileNumber);
        NavigationSection.navigateToReportInformation().verifyUnsavedChangesModal().clickYesButton()
        .navigateToClientPage();
        Report.Client.enterClientName(testData.clientName).
        enterClientFileNumber(testData.clientFileNumber+"_UNSAVED");
        NavigationSection.navigateToReportInformation().verifyUnsavedChangesModal().clickNoButton()
        .navigateToClientPage();
        Report.Client.verifyInputChangesToBeUnsaved(testData.clientFileNumber);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});