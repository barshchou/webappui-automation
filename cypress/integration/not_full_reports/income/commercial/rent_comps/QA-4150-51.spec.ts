import { Income } from './../../../../../actions/index';
import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4150-51.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Check that Commercial Rent Comps map has Filters dropdown", 
    { tags:[ "@income", "@commercial", "@rent_comps" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Income > Commercial > Rent Comps");
        NavigationSection.navigateToCommercialRentComps();

        cy.stepInfo("2. Open map and verify button zooms");
        Income._CommercialManager.RentComps.openMap()
            .verifyProgressBarNotExist()
            .verifyFiltersDropdownExist();
        
        Income._CommercialManager.RentComps.Page.starZoomButton.click();
        Income._CommercialManager.RentComps.verifyProgressBarNotExist();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});