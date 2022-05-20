import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4307.fixture";
import Report from "../../../../actions/report/report.manager";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../utils/tags.utils";

describe(`As Is Market Value -> Time Period date is pulled from Report ->
    Key Info -> Date of validation (As is)`, 
    { tags: [ Tag.sales, Tag.value_conclusion ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        Report.KeyInfo.enterDateByType(testData.dateOfValuation);
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.verifyAsIsMarketPeriod(testData.dateOfValuation.date);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});