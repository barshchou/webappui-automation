import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import ReportDataCreator from "../../../../fixtures/data_creator/reportData.creator";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";
import Organization from "../../../../actions/organization/organization.manager";

const reportCreationData = ReportDataCreator.getReportData("4654");

describe("Verify the functionality of the ADD button on the Client page", 
    { tags: [ "@report", "@client" ] }, () => {
        
    before("Login, create report", () => {
        createReport(reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToClientPage();
        Report.Client.clickAddClientButton();
        Organization.Info.verifyPageOpened();
        deleteReport(reportCreationData.reportNumber);
    });
});