import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4174.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";


describe("Prospective Market Value As Stabilized is calculated like Concluded Value per SF * GBA", () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.enterSaleValueConclusion(testData.valueConclusion)
            .verifyAsIsMarketAmount(testData.asIsMarket);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});