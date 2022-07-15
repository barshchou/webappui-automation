import { createReport, deleteReport } from "../actions/base/baseTest.actions";
import ReportDataCreator from "../fixtures/data_creator/reportData.creator";
import { BoweryAutomation } from "../types/boweryAutomation.type";

describe("This spec is created only for representation purposes only, will be deleted", () => {
    it("Body", () => {
        const reportData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("test");
        createReport(reportData);
        deleteReport(reportData.reportNumber);
    });
});
