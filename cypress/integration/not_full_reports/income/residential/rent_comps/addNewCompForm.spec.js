import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/addNewCompForm.fixtures";
import {commonData} from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/addNewCompForm.fixtures";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import RentComps from "../../../../../actions/income/residential/rent_comps/rentComps.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";

describe("Add new comparable form tests", () => {
    before("Login and open rent comps page", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToRentComps();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID67: Button: Add New Rent Comp > Property Search wizard opened > Select Address", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.clickCloseButton();
    });

    it("ID68: Address, Neighborhood, Block, Lot are at the top of the form", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.verifyPropAddressExist()
            .clickCloseButton();
    });

    it("ID69:  Unit Number* text field", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.verifyUnitNumbFieldName()
            .enterUnitNumber(commonData().unitNumber)
            .clickCloseButton();
    });

    it("ID70: Unit Type dropdown", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.selectListUnitTypes(commonData().unitTypes)
            .clickCloseButton();
    });

    it("ID71: Monthly Rent* text field", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.verifyMonthRentFieldName()
            .enterMonthlyRent(commonData().monthlyRent)
            .clickCloseButton();
    });

    it("ID72: Date of Value* date picker in the text field", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.enterDate()
            .clearDateInput()
            .chooseDayOfCurrentMonthInPicker()
            .clickCloseButton();
    });

    it("ID73: Unit Square Footage text field", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.verifySquareFootageFieldName()
            .enterSquareFootage(commonData().squareFootage)
            .clickCloseButton();
    });

    it("ID74: Source of Information dropdown", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.selectListSourceOfInfoAndVerify(commonData().infoSources)
            .clickCloseButton();
    });

    it("ID75: Number of Bedrooms* text field", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.verifyNumberOfBedroomsFiledName()
            .enterNumberOfBedrooms(commonData().numberOfBedrooms)
            .clickCloseButton();
    });

    it("ID76: Source Name text field", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.selectSourceOfInfoAndVerify(commonData().infoSources[1])
            .enterSourceName(testData.id76.sourceName)
            .selectSourceOfInfoAndVerify(commonData().infoSources[0])
            .verifySourceNameNotExist()
            .selectSourceOfInfoAndVerify(commonData().infoSources[2])
            .enterSourceName(testData.id76.sourceName)
            .clickCloseButton();
    });

    it("ID77: Source URL text field", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.verifySourceUrlNotExist()
            .selectSourceOfInfoAndVerify(commonData().infoSources[1])
            .enterSourceUrl(testData.id77.sourceUrl)
            .selectSourceOfInfoAndVerify(commonData().infoSources[0])
            .verifySourceUrlNotExist()
            .selectSourceOfInfoAndVerify(commonData().infoSources[2])
            .verifySourceUrlNotExist()
            .clickCloseButton();
    });

    it("ID78: Number of Rooms* text field", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.verifyNumberOfRoomsFieldName()
            .enterNumberOfRooms(commonData().numberOfRooms)
            .clickCloseButton();
    });

    it("ID79: Number of Bathrooms", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.verifyNumberOfBathFieldName()
            .enterNumberOfBathrooms(testData.id79.numberOfBathOk)
            .enterNumberOfBathrooms(testData.id79.numberOfBathWrong)
            .clickCloseButton();
    });

    it("ID80: Internal Notes text field", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.enterInternalNotes(testData.id80.internalNotes)
            .clickCloseButton();
    });

    it("ID81: Unit Amenities dropdown", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.verifyUnitAmenitiesFieldName()
            .clickUnitAmenitiesDropdown()
            .checkListOfCheckboxesByQa(commonData().amenitiesQaAttr)
            .uncheckListOfCheckboxesByQa(commonData().amenitiesQaAttr)
            .clickUnitAmenitiesDropdown()
            .clickCloseButton();
    });

    it.skip("ID82: Back to Results link", () => {
        RentComps.BaseActions.openAddNewComparableForm(commonData().searchAddress);
        RentComps.AddForm.clickCancelButton();
        RentComps.BaseActions.verifySearchResultIsShown();
        RentComps.AddForm.clickCloseButton();
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});
