import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/unitMapRentComps.fixtures";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import RentComps from "../../../../../actions/income/residential/rent_comps/rentComps.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";

describe("Unit map tests", () => {
   before("Login and open Rent Comps", () => {
       createReport(testData.reportCreationData);
       NavigationSection.navigateToRentComps();
       cy.saveLocalStorage();
   });

   beforeEach(() => {
       cy.restoreLocalStorage();
   });

    it("ID64: Unit Map: Zoom in / Zoom out buttons ('+' / '-')", () => {
        RentComps.BaseActions.verifyLoadingDoesntExist()
           .clickZoomOutButton()
           .clickZoomInButton();
    });

   after("Delete report", () => {
      cy.restoreLocalStorage();
      deleteReport(testData.reportCreationData.reportNumber);
   });
});
