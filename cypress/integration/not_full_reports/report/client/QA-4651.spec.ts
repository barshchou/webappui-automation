import { createReport } from "../../../../actions/base/baseTest.actions";
import ReportDataCreator from "../../../../fixtures/data_creator/reportData.creator";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";

const reportCreationData = ReportDataCreator.getReportData("4651");

describe("Verify the Back button functionality on the Client page", 
    { tags: [ "@report", "@client", "@fix" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToClientPage();
            Report.Client.clickBackButton();
            Report.Appraiser.verifyPageOpened();
        });
    });