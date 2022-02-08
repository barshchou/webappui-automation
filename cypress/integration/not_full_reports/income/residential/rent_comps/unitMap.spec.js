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

    it("ID50: Unit Types dropdown", () => {
        RentComps.BaseActions.clickUnitTypesArrowButton()
            .checkListOfCheckboxesByQa(testData.data.unitTypesQaAttrs)
            .uncheckListOfCheckboxesByQa(testData.data.unitTypesQaAttrs)
            .clickUnitTypesArrowButton();
    });

    it("ID51: Min Rent text field", () => {
        const filedName = "minRent";
        RentComps.BaseActions.enterValueToInput(filedName, testData.data.minRentValue)
            .clearInput(filedName);
    });

    it("ID52: Max Rent text field", () => {
        const fieldName = "maxRent";
        RentComps.BaseActions.enterValueToInput(fieldName, testData.data.maxRentValue)
            .clearInput(fieldName);
    });

    it("ID53: Min SF text field", () => {
        const fieldName = "minSF";
        RentComps.BaseActions.enterValueToInput(fieldName, testData.data.minSquareFeet)
            .clearInput(fieldName);
    });

    it("ID54: Max SF text field", () => {
        const fieldName = "maxSF";
        RentComps.BaseActions.enterValueToInput(fieldName, testData.data.maxSquareFeet)
            .clearInput(fieldName);
    });

    it("ID55: Bedrooms dropdown", () => {
        RentComps.BaseActions.clickNumberOfBedroomsArrow()
           .checkListOfCheckboxesByQa(testData.data.numberOfBedroomsQaAttr)
           .uncheckListOfCheckboxesByQa(testData.data.numberOfBedroomsQaAttr)
           .clickNumberOfBedroomsArrow();
    });

    it("ID59: Reset Filters button", () => {
        const fieldName = "minSF";
        RentComps.BaseActions.enterValueToInput(fieldName, testData.data.minSquareFeet)
            .clickResetFiltersButton()
            .verifyEnteredValueToInput(fieldName);
    });

    it("ID60: # Results Found text", () => {
        RentComps.BaseActions.verifyNumberOfFoundResultsExist();
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
