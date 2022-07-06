import { Income } from '../../../../../actions/index';
import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4148_50-51.fixture";
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

        cy.stepInfo("2. Open map and verify button zooms and draw polygon exist");
        Income._CommercialManager.RentComps.openMap()
            .verifyProgressBarNotExist()
            .verifyFiltersDropdownExist();
        
        Income._CommercialManager.RentComps.Page.mapDrawPolygonButton.should("exist");
        Income._CommercialManager.RentComps.Page.mapStarZoomButton.click();
        Income._CommercialManager.RentComps.verifyProgressBarNotExist();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});