import { createReport } from "../../actions/base/baseTest.actions";
import ReportDataCreator from "../../fixtures/data_creator/reportData.creator";
import { Base, ReviewExport } from "../../actions";
import { BoweryAutomation } from "../../types/boweryAutomation.type";

const reportCreationData: 
BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("generateOpenXMLNewReport");

describe("Create new report, generate and open in XML format", { tags: [ "@smoke" ] }, () => {

    it("Generate and open XML report", () => {
        createReport(reportCreationData);
        Base._NavigationSection.openReviewAndExport();
        ReviewExport.verifyXMLReportName(reportCreationData.reportNumber)
            .verifyXMLReportOpens(reportCreationData.reportNumber);
    });
});