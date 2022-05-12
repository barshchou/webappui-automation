import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4113.fixture";
import Sales from "../../../../actions/sales/sales.manager";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";


describe("Net Property Adjustments in Sales Adjustment Grid is calculated with correct formula", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMapByAddress(testData.comparable.address);
        _NavigationSection.openAdjustCompsInSales().pause();
        /**
         * ernst: use this report as a source of info 
         * https://bowery-staging.herokuapp.com/report/61dc994bd8ae9f0034619e54/sales-adjustment-grid
         */
        deleteReport(testData.reportCreationData.reportNumber);
    });
});