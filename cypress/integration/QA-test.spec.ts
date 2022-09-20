import { createReport } from "../actions/base/baseTest.actions";
import ReportDataCreator from "../fixtures/data_creator/reportData.creator";

describe("Test", () => {
    it("Test", () => {
        createReport(ReportDataCreator.getReportData("test"));
    });
});