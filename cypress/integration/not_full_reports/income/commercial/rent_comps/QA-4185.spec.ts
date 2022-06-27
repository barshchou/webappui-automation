import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4185.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";


describe("Per Square Foot Per Month radiobutton is displayed on Commercial Unit Details modal",
    { tags: [ "@income", "@commercial", "@rent_comps" ] }, () => {

    before("Create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to commercial rent Comps");
        _NavigationSection.navigateToCommercialRentComps();
        cy.stepInfo("2. Add any comp, open CommercialUnitDetails modal, verify button is displayed");
        Income._CommercialManager.RentComps.clickAddCompButtonByIndex()
            .clickEditButtonByRowNumber().Page.getUnitMeasureRadioByValue(testData.unitMeasure).should("exist");
        deleteReport(testData.reportCreationData.reportNumber);
    });
});