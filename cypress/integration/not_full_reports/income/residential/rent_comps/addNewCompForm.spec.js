const testData = require("../../../../../fixtures/addNewCompForm.fixtures.json");
import homepageActions from "../../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../../actions/base/navigationSection.actions";
import rentCompsActions from "../../../../../actions/income/residential/rent_comps/rentComps.actions";
import addCompFormActions from "../../../../../actions/income/residential/rent_comps/addCompForm.actions";

describe("Add new comparable form tests", () => {
    before("Login and open rent comps page", () => {
        cy.login();
        cy.wait(5000);
        homepageActions.createReport();
        navSectionActions.navigateToRentComps();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID67: Button: Add New Rent Comp > Property Search wizard opened > Select Address", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.clickCloseButton();
    });

    it("ID68: Address, Neighborhood, Block, Lot are at the top of the form", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifyPropAddressExist();
        addCompFormActions.clickCloseButton();
    });

    it("ID69:  Unit Number* text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifyUnitNumbFieldName();
        addCompFormActions.enterUnitNumber(testData.unitNumber);
        addCompFormActions.clickCloseButton();
    });

    it("ID70: Unit Type dropdown", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.selectListUnitTypes(testData.unitTypes);
        addCompFormActions.clickCloseButton();
    });

    it("ID71: Monthly Rent* text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifyMonthRentFieldName();
        addCompFormActions.enterMonthlyRent(testData.monthlyRent);
        addCompFormActions.clickCloseButton();
    });

    it("ID72: Date of Value* date picker in the text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.enterDate();
        addCompFormActions.clearDateInput();
        addCompFormActions.chooseDayOfCurrentMonthInPicker();
        addCompFormActions.clickCloseButton();
    });

    it("ID73: Unit Square Footage text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifySquareFootageFieldName();
        addCompFormActions.enterSquareFootage(testData.squareFootage);
        addCompFormActions.clickCloseButton();
    });

    it("ID74: Source of Information dropdown", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.selectListSourceOfInfoAndVerify(testData.infoSources);
        addCompFormActions.clickCloseButton();
    });

    it("ID75: Number of Bedrooms* text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifyNumberOfBedroomsFiledName();
        addCompFormActions.enterNumberOfBedrooms(testData.numberOfBedrooms);
        addCompFormActions.clickCloseButton();
    });

    it("ID76: Source Name text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.selectSourceOfInfoAndVerify(testData.infoSources[1]);
        addCompFormActions.enterSourceName(testData.sourceName);
        addCompFormActions.selectSourceOfInfoAndVerify(testData.infoSources[0]);
        addCompFormActions.verifySourceNameNotExist();
        addCompFormActions.selectSourceOfInfoAndVerify(testData.infoSources[2]);
        addCompFormActions.enterSourceName(testData.sourceName);
        addCompFormActions.clickCloseButton();
    });

    it("ID77: Source URL text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifySourceUrlNotExist();
        addCompFormActions.selectSourceOfInfoAndVerify(testData.infoSources[1]);
        addCompFormActions.enterSourceUrl(testData.sourceUrl);
        addCompFormActions.selectSourceOfInfoAndVerify(testData.infoSources[0]);
        addCompFormActions.verifySourceUrlNotExist();
        addCompFormActions.selectSourceOfInfoAndVerify(testData.infoSources[2]);
        addCompFormActions.verifySourceUrlNotExist();
        addCompFormActions.clickCloseButton();
    });

    it("ID78: Number of Rooms* text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifyNumberOfRoomsFieldName();
        addCompFormActions.enterNumberOfRooms(testData.numberOfRooms);
        addCompFormActions.clickCloseButton();
    });

    it("ID79: Number of Bathrooms", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifyNumberOfBathFieldName();
        addCompFormActions.enterNumberOfBathrooms(testData.numberOfBathOk);
        addCompFormActions.enterNumberOfBathrooms(testData.numberOfBathWrong);
        addCompFormActions.clickCloseButton();
    });

    it("ID80: Internal Notes text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.enterInternalNotes(testData.internalNotes);
        addCompFormActions.clickCloseButton();
    });

    it("ID81: Unit Amenities dropdown", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifyUnitAmenitiesFieldName();
        addCompFormActions.clickUnitAmenitiesDropdown();
        addCompFormActions.checkUncheckListOfCheckboxesByQa(testData.amenitiesQaAttr);
        addCompFormActions.checkUncheckListOfCheckboxesByQa(testData.amenitiesQaAttr, false);
        addCompFormActions.clickUnitAmenitiesDropdown();
        addCompFormActions.clickCloseButton();
    });

    it.skip("ID82: Back to Results link", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.clickCancelButton();
        rentCompsActions.verifySearchResultIsShown();
        addCompFormActions.clickCloseButton();
    });

    it("ID83:  Add Unit button", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.enterUnitNumber(testData.unitNumber);
        addCompFormActions.selectUnitTypeAndVerify(testData.unitTypes[0]);
        addCompFormActions.enterMonthlyRent(testData.monthlyRent);
        addCompFormActions.enterDate();
        addCompFormActions.enterSquareFootage(testData.squareFootage);
        addCompFormActions.selectSourceOfInfoAndVerify(testData.infoSources[0]);
        addCompFormActions.enterNumberOfBedrooms(testData.numberOfBedrooms);
        addCompFormActions.enterNumberOfRooms(testData.numberOfRooms);
        addCompFormActions.enterNumberOfBathrooms(testData.numberOfBathOk);
        addCompFormActions.clickUnitAmenitiesDropdown();
        addCompFormActions.checkUncheckListOfCheckboxesByQa(testData.amenitiesQaAttr);
        addCompFormActions.clickUnitAmenitiesDropdown();
        addCompFormActions.clickSubmitCompButton();
        rentCompsActions.verifyAddedComparable(0, testData.numberOfRooms, testData.numberOfBedrooms,
            testData.monthlyRent, testData.sourceOfInfoTexts[0]);
        cy.reload();
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentCompsActions.returnToHomePage();
        homepageActions.deleteReport();
    });
});
