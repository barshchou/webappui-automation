import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/unitMapRentComps.fixtures";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import RentComps from "../../../../../actions/income/residential/rent_comps/rentComps.manager";
import {waitForTime} from "../../../../../../utils/waiters.utils";

describe("Unit map tests", () => {
   before("Login and open Rent Comps", () => {
       cy.login();
       waitForTime();
       Homepage.createReport(testData.reportCreationData);
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

    it("ID56: Source of Information dropdown", () => {
        RentComps.BaseActions.clickSourceOfInfoButton()
            .checkListOfCheckboxesByQa(testData.data.sourceOfInfoQaAttr)
            .uncheckListOfCheckboxesByQa(testData.data.sourceOfInfoQaAttr)
            .clickSourceOfInfoButton();
    });

    it("ID57: Date of Value Range", () => {
        RentComps.BaseActions.enterDatesToInputs(testData.data.dateInputTypes)
            .clearDateInputs(testData.data.dateInputTypes)
            .selectDaysFromPickerByTypes(testData.data.dateInputTypes)
            .verifyEnteredDatesByTypes(testData.data.dateInputTypes)
            .clearDateInputs(testData.data.dateInputTypes);
    });

    it("ID58: Amenities dropdown", () => {
        RentComps.BaseActions.clickAmenitiesArrow()
            .checkListOfCheckboxesByQa(testData.data.amenitiesQaAttr)
            .uncheckListOfCheckboxesByQa(testData.data.amenitiesQaAttr)
            .clickAmenitiesArrow();
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

    it("ID61: 'Sort by' dropdown", () => {
        RentComps.BaseActions.selectSortByOptionsByValues(testData.data.sortByOptions);
    });

    it("ID62: Search Results", () => {
        RentComps.BaseActions.verifyPhotosExistAndNavigateByPhotos(testData.data.comparableIndex)
            .verifyCompAddressesExist()
            .verifyRentsTexts()
            .verifyCompAmenitiesTextsExist()
            .verifyComparablePropertyTextsExist();
    });

    it("ID63: SELECT button - turns to SELECTED", () => {
        RentComps.BaseActions.verifyLoadingDoesntExist()
            .clickAllSelectComparableButtons()
            .verifyComparableGroups(testData.data.numberOfUnits);
    });

    it("ID64: Unit Map: Zoom in / Zoom out buttons ('+' / '-')", () => {
        RentComps.BaseActions.verifyLoadingDoesntExist()
           .clickZoomOutButton()
           .clickZoomInButton();
    });

   after("Delete report", () => {
      cy.restoreLocalStorage();
       RentComps.BaseActions.returnToHomePage();
      Homepage.deleteReport(testData.reportCreationData.reportNumber);
   });
});
