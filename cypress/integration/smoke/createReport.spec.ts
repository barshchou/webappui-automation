import { createReport, deleteReport } from "../../actions/base/baseTest.actions";
import ReportDataCreator from "../../fixtures/data_creator/reportData.creator";
import Enums from "../../enums/enums";
import { Report } from "../../actions";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("createReport", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

describe("Create report test", { tags: [ "@smoke" ] }, () => {

    it("Test body", () => {
        const headerToContain = reportCreationData.address.split(",")[0];
        createReport(reportCreationData);
        Report._KeyInfo.Page.pageTitle.should("exist").and("have.text", "Key Info");
        Report._KeyInfo.Page.Header.should("contain.text", headerToContain);
        deleteReport(reportCreationData.reportNumber);
    });
});