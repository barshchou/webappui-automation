const testData = require("../../../../fixtures/unitMapRentComps.fixtures.json");
import homepageActions from "../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../actions/base/navigationSection.actions";
import rentCompsActions from "../../../../actions/income/residental/rentComps.actions";

describe("Unit map tests", () => {
   before("Login and open Rent Comps", () => {
       cy.loginByApi();
       homepageActions.createReport();
       navSectionActions.navigateToRentComps();
       cy.saveLocalStorage();
   });

   beforeEach(() => {
       cy.restoreLocalStorage();
   });

    it.skip("ID50: Unit Types dropdown", () => {
        rentCompsActions.clickUnitTypesArrowButton();
        rentCompsActions.checkUncheckListOfCheckboxesByQa(testData.unitTypesQaAttr);
        rentCompsActions.checkUncheckListOfCheckboxesByQa(testData.unitTypesQaAttr, false);
        rentCompsActions.clickUnitTypesArrowButton();
    });

    it.skip("ID51: Min Rent text field", () => {
        const filedName = "minRent";
        rentCompsActions.enterValueToInput(filedName, testData.minRentValue);
        rentCompsActions.clearInput(filedName);
    });

    it.skip("ID52: Max Rent text field", () => {
        const fieldName = "maxRent";
        rentCompsActions.enterValueToInput(fieldName, testData.maxRentValue);
        rentCompsActions.clearInput(fieldName);
    });

    it.skip("ID53: Min SF text field", () => {
        const fieldName = "minSF";
        rentCompsActions.enterValueToInput(fieldName, testData.minSquareFeet);
        rentCompsActions.clearInput(fieldName);
    });

    it.skip("ID54: Max SF text field", () => {
        const fieldName = "maxSF";
        rentCompsActions.enterValueToInput(fieldName, testData.maxSquareFeet);
        rentCompsActions.clearInput(fieldName);
    });

    it.skip("ID55: Bedrooms dropdown", () => {
       rentCompsActions.clickNumberOfBedroomsArrow();
       rentCompsActions.checkUncheckListOfCheckboxesByQa(testData.numberOfBedroomsQaAttr);
       rentCompsActions.checkUncheckListOfCheckboxesByQa(testData.numberOfBedroomsQaAttr, false);
       rentCompsActions.clickNumberOfBedroomsArrow();
    });

    it.skip("ID56: Source of Information dropdown", () => {
        rentCompsActions.clickSourceOfInfoButton();
        rentCompsActions.checkUncheckListOfCheckboxesByQa(testData.sourceOfInfoQaAttr);
        rentCompsActions.checkUncheckListOfCheckboxesByQa(testData.sourceOfInfoQaAttr, false);
        rentCompsActions.clickSourceOfInfoButton();
    });

    it.skip("ID57: Date of Value Range", () => {
        rentCompsActions.enterDatesToInputs(testData.dateInputTypes);
        rentCompsActions.clearDateInputs(testData.dateInputTypes);
        rentCompsActions.selectDaysFromPickerByTypes(testData.dateInputTypes);
        rentCompsActions.verifyEnteredDatesByTypes(testData.dateInputTypes);
        rentCompsActions.clearDateInputs(testData.dateInputTypes);
    });

    it.skip("ID58: Amenities dropdown", () => {
        rentCompsActions.clickAmenitiesArrow();
        rentCompsActions.checkUncheckListOfCheckboxesByQa(testData.amenitiesQaAttr);
        rentCompsActions.checkUncheckListOfCheckboxesByQa(testData.amenitiesQaAttr, false);
        rentCompsActions.clickAmenitiesArrow();
    });

    it("ID59: Reset Filters button", () => {
        const fieldName = "minSF";
        rentCompsActions.enterValueToInput(fieldName, testData.minSquareFeet);
        rentCompsActions.clickResetFiltersButton();
        rentCompsActions.verifyEnteredValueToInput(fieldName);
    });

    it("ID60: # Results Found text", () => {
        rentCompsActions.verifyNumberOfFoundResultsExist();
    });

   after("Delete report", () => {
      cy.restoreLocalStorage();
      rentCompsActions.returnToHomePageAndSave();
      homepageActions.deleteReport();
   });
});