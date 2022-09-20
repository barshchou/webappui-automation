import { createReport } from "../actions/base/baseTest.actions";
import ReportDataCreator from "../fixtures/data_creator/reportData.creator";

describe("Test", { tags: [ "@test" ] }, () => {
    it("Test", () => {
        createReport(ReportDataCreator.getReportData("test"));
    });
});