import testData from "../../../../../fixtures/unitMapRentComps.fixtures";
import homepageActions from "../../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../../actions/base/navigationSection.actions";
import rentCompsActions from "../../../../../actions/income/residential/rent_comps/rentComps.actions";

describe("Unit map tests", () => {
   before("Login and open Rent Comps", () => {
       cy.login();
       homepageActions.createReport(testData.reportCreationData);
       navSectionActions.navigateToRentComps();
       cy.saveLocalStorage();
   });

   beforeEach(() => {
       cy.restoreLocalStorage();
   });

    it("ID50: Unit Types dropdown", () => {
        rentCompsActions.clickUnitTypesArrowButton()
            .checkListOfCheckboxesByQa(testData.data.unitTypesQaAttrs)
            .uncheckListOfCheckboxesByQa(testData.data.unitTypesQaAttrs)
            .clickUnitTypesArrowButton();
    });

    it("ID51: Min Rent text field", () => {
        const filedName = "minRent";
        rentCompsActions.enterValueToInput(filedName, testData.data.minRentValue)
            .clearInput(filedName);
    });

    it("ID52: Max Rent text field", () => {
        const fieldName = "maxRent";
        rentCompsActions.enterValueToInput(fieldName, testData.data.maxRentValue)
            .clearInput(fieldName);
    });

    it("ID53: Min SF text field", () => {
        const fieldName = "minSF";
        rentCompsActions.enterValueToInput(fieldName, testData.data.minSquareFeet)
            .clearInput(fieldName);
    });

    it("ID54: Max SF text field", () => {
        const fieldName = "maxSF";
        rentCompsActions.enterValueToInput(fieldName, testData.data.maxSquareFeet)
            .clearInput(fieldName);
    });

    it("ID55: Bedrooms dropdown", () => {
       rentCompsActions.clickNumberOfBedroomsArrow()
           .checkListOfCheckboxesByQa(testData.data.numberOfBedroomsQaAttr)
           .uncheckListOfCheckboxesByQa(testData.data.numberOfBedroomsQaAttr)
           .clickNumberOfBedroomsArrow();
    });

    it("ID56: Source of Information dropdown", () => {
        rentCompsActions.clickSourceOfInfoButton()
            .checkListOfCheckboxesByQa(testData.data.sourceOfInfoQaAttr)
            .uncheckListOfCheckboxesByQa(testData.data.sourceOfInfoQaAttr)
            .clickSourceOfInfoButton();
    });

    it("ID57: Date of Value Range", () => {
        rentCompsActions.enterDatesToInputs(testData.data.dateInputTypes)
            .clearDateInputs(testData.data.dateInputTypes)
            .selectDaysFromPickerByTypes(testData.data.dateInputTypes)
            .verifyEnteredDatesByTypes(testData.data.dateInputTypes)
            .clearDateInputs(testData.data.dateInputTypes);
    });

    it("ID58: Amenities dropdown", () => {
        rentCompsActions.clickAmenitiesArrow()
            .checkListOfCheckboxesByQa(testData.data.amenitiesQaAttr)
            .uncheckListOfCheckboxesByQa(testData.data.amenitiesQaAttr)
            .clickAmenitiesArrow();
    });

    it("ID59: Reset Filters button", () => {
        const fieldName = "minSF";
        rentCompsActions.enterValueToInput(fieldName, testData.data.minSquareFeet)
            .clickResetFiltersButton()
            .verifyEnteredValueToInput(fieldName);
    });

    it("ID60: # Results Found text", () => {
        rentCompsActions.verifyNumberOfFoundResultsExist();
    });

    it("ID61: 'Sort by' dropdown", () => {
        rentCompsActions.selectSortByOptionsByValues(testData.data.sortByOptions);
    });

    it.skip("ID62: Search Results", () => {
        rentCompsActions.verifyPhotosExistAndNavigateByPhotos(testData.data.comparableIndex)
            .verifyCompAddressesExist()
            .verifyRentsTexts()
            .verifyCompAmenitiesTextsExist()
            .verifyComparablePropertyTextsExist();
    });

    it.skip("ID63: SELECT button - turns to SELECTED", () => {
        rentCompsActions.verifyLoadingDoesntExist()
            .clickAllSelectComparableButtons()
            .verifyComparableGroups(testData.data.numberOfUnits);
    });

    it("ID64: Unit Map: Zoom in / Zoom out buttons ('+' / '-')", () => {
       rentCompsActions.verifyLoadingDoesntExist()
           .clickZoomOutButton()
           .clickZoomInButton();
    });

   after("Delete report", () => {
      cy.restoreLocalStorage();
      rentCompsActions.returnToHomePage();
      homepageActions.deleteReport(testData.reportCreationData.reportNumber);
   });
});
