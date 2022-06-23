import { loginAction } from './../../actions/base/baseTest.actions';
import { Base, ReviewExport } from "../../actions";
import testData from "../../fixtures/smoke/generateOpenXMLExistReport.fixture";
import { createReport, deleteReport } from "../../actions/base/baseTest.actions";

describe("Open any existing report, generate and open in XML format", { tags: [ "@smoke" ] }, () => {

    it("Generate and open XML report", () => {
        loginAction(testData.username, testData.password);
        Base._HomePage.clickAllReportsTab()
            .verifyProgressBarNotExist()
            .enterReportNumberToSearch(testData.reportCreationData.reportNumber)
            .openReportByName(testData.reportCreationData.reportNumber)
            .verifyProgressBarNotExist();
        Base._NavigationSection.openReviewAndExport(false)
            .verifyProgressBarNotExist();
        ReviewExport.verifyXMLReportName(testData.reportCreationData.reportNumber)
        .verifyXMLReportOpens(testData.reportCreationData.reportNumber);
    });

    it("Create new report for next tests", () => {
        createReport(testData.reportCreationData);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});