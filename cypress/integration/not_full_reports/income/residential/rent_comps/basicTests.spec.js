import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/basicRentComps.fixtures";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import RentComps from "../../../../../actions/income/residential/rent_comps/rentComps.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";

describe("Basic Rent Comps tests", () => {
    before("Login and navigate to Rent Comps", () => {
       createReport(testData.reportCreationData);
       NavigationSection.navigateToRentComps();
       cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID45: GC section: Comparable Rentals Introduction", () => {
        RentComps.BaseActions.verifyGCText(testData.reportCreationData.conclusionValue);
    });

    it("ID46, ID47 and ID48: Unit button, Building button and PopUp", () => {
        RentComps.BaseActions.changeToBuildingSearch()
            .changeToUnitSearch();
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});
