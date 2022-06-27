import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4185.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";


describe("Test", () => {

    before("Create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps.clickAddCompButtonByIndex()
            .clickEditButtonByRowNumber().Page.getUnitMeasureRadioByValue(testData.unitMeasure).should("exist");
        deleteReport(testData.reportCreationData.reportNumber);
    });
});