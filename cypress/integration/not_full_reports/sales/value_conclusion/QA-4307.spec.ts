import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4307.fixture";
import Report from "../../../../actions/report/report.manager";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`As Is Market Value -> Time Period date is pulled from Report ->
    Key Info -> Date of validation (As is)`, 
{ tags: [ "@sales", "@value_conclusion", "@bug", "@WEB-7111" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4307]", () => {
        Report.KeyInfo.enterDateByType(testData.dateOfValuation);
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.verifyAsIsMarketPeriod(testData.dateOfValuation.date);
    });
});