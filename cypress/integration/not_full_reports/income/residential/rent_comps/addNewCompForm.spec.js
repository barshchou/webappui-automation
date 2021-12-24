import newTestData from "../../../../../fixtures/addNewCompForm.fixtures";
import {commonData} from "../../../../../fixtures/addNewCompForm.fixtures";
import homepageActions from "../../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../../actions/base/navigationSection.actions";
import rentCompsActions from "../../../../../actions/income/residential/rent_comps/rentComps.actions";
import addCompFormActions from "../../../../../actions/income/residential/rent_comps/addCompForm.actions";

describe("Add new comparable form tests", () => {
    before("Login and open rent comps page", () => {
        cy.login();
        homepageActions.createReport(newTestData.reportCreationData);
        navSectionActions.navigateToRentComps();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID67: Button: Add New Rent Comp > Property Search wizard opened > Select Address", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.clickCloseButton();
    });

    it("ID68: Address, Neighborhood, Block, Lot are at the top of the form", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.verifyPropAddressExist()
            .clickCloseButton();
    });

    it("ID69:  Unit Number* text field", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.verifyUnitNumbFieldName()
            .enterUnitNumber(commonData().unitNumber)
            .clickCloseButton();
    });

    it("ID70: Unit Type dropdown", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.selectListUnitTypes(commonData().unitTypes)
            .clickCloseButton();
    });

    it("ID71: Monthly Rent* text field", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.verifyMonthRentFieldName()
            .enterMonthlyRent(commonData().monthlyRent)
            .clickCloseButton();
    });

    it("ID72: Date of Value* date picker in the text field", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.enterDate()
            .clearDateInput()
            .chooseDayOfCurrentMonthInPicker()
            .clickCloseButton();
    });

    it("ID73: Unit Square Footage text field", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.verifySquareFootageFieldName()
            .enterSquareFootage(commonData().squareFootage)
            .clickCloseButton();
    });

    it("ID74: Source of Information dropdown", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.selectListSourceOfInfoAndVerify(commonData().infoSources)
            .clickCloseButton();
    });

    it("ID75: Number of Bedrooms* text field", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.verifyNumberOfBedroomsFiledName()
            .enterNumberOfBedrooms(commonData().numberOfBedrooms)
            .clickCloseButton();
    });

    it("ID76: Source Name text field", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.selectSourceOfInfoAndVerify(commonData().infoSources[1])
            .enterSourceName(newTestData.id76.sourceName)
            .selectSourceOfInfoAndVerify(commonData().infoSources[0])
            .verifySourceNameNotExist()
            .selectSourceOfInfoAndVerify(commonData().infoSources[2])
            .enterSourceName(newTestData.id76.sourceName)
            .clickCloseButton();
    });

    it("ID77: Source URL text field", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.verifySourceUrlNotExist()
            .selectSourceOfInfoAndVerify(commonData().infoSources[1])
            .enterSourceUrl(newTestData.id77.sourceUrl)
            .selectSourceOfInfoAndVerify(commonData().infoSources[0])
            .verifySourceUrlNotExist()
            .selectSourceOfInfoAndVerify(commonData().infoSources[2])
            .verifySourceUrlNotExist()
            .clickCloseButton();
    });

    it("ID78: Number of Rooms* text field", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.verifyNumberOfRoomsFieldName()
            .enterNumberOfRooms(commonData().numberOfRooms)
            .clickCloseButton();
    });

    it("ID79: Number of Bathrooms", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.verifyNumberOfBathFieldName()
            .enterNumberOfBathrooms(newTestData.id79.numberOfBathOk)
            .enterNumberOfBathrooms(newTestData.id79.numberOfBathWrong)
            .clickCloseButton();
    });

    it("ID80: Internal Notes text field", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.enterInternalNotes(newTestData.id80.internalNotes)
            .clickCloseButton();
    });

    it("ID81: Unit Amenities dropdown", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.verifyUnitAmenitiesFieldName()
            .clickUnitAmenitiesDropdown()
            .checkListOfCheckboxesByQa(commonData().amenitiesQaAttr)
            .uncheckListOfCheckboxesByQa(commonData().amenitiesQaAttr)
            .clickUnitAmenitiesDropdown()
            .clickCloseButton();
    });

    it.skip("ID82: Back to Results link", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.clickCancelButton();
        rentCompsActions.verifySearchResultIsShown();
        addCompFormActions.clickCloseButton();
    });

    it("ID83:  Add Unit button", () => {
        rentCompsActions.openAddNewComparableForm(commonData().searchAddress);
        addCompFormActions.enterUnitNumber(commonData().unitNumber)
            .selectUnitTypeAndVerify(commonData().unitTypes[0])
            .enterMonthlyRent(commonData().monthlyRent)
            .enterDate()
            .enterSquareFootage(commonData().squareFootage)
            .selectSourceOfInfoAndVerify(commonData().infoSources[0])
            .enterNumberOfBedrooms(commonData().numberOfBedrooms)
            .enterNumberOfRooms(commonData().numberOfRooms)
            .enterNumberOfBathrooms(newTestData.id79.numberOfBathOk)
            .clickUnitAmenitiesDropdown()
            .checkListOfCheckboxesByQa(commonData().amenitiesQaAttr)
            .clickUnitAmenitiesDropdown()
            .clickSubmitCompButton();
        rentCompsActions.verifyAddedComparable(0, commonData().numberOfRooms, commonData().numberOfBedrooms,
            commonData().monthlyRent, commonData().sourceOfInfoSubject);
        cy.reload();
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentCompsActions.returnToHomePage();
        homepageActions.deleteReport(newTestData.reportCreationData.reportNumber);
    });
});
