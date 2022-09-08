import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4339.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";

describe(`Verify clicking Add Unit button on Add New Rent Comp overlay is adding the unit to the appropriate group 
of comparable units on the Rent Comps page (Unit type of search is selected)`,
{ tags:[ "@income", "@residential", "@rent_comps" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4339]", () => {
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.enterAllEqualRentTypeCells(testData.rentType)
            .enterBedroomsNumberByRowNumber(testData.numberOfBedrooms)
            .checkCheckboxByLabel(testData.includePerRoomCheckbox);
        _NavigationSection.navigateToResidentialRentComps();
        Income._Residential.RentComps.BaseActions.verifyUnitSelected()
            .openAddNewComparableForm(testData.formData.address);
        Income._Residential.RentComps.AddForm.enterUnitNumber(testData.formData.unitNumber)
            .selectUnitTypeAndVerify(testData.formData.unitType)
            .enterMonthlyRent(testData.formData.monthly)
            .enterDate()
            .enterSquareFootage(testData.formData.squareFootage)
            .selectSourceOfInfoAndVerify(testData.formData.infoSource)
            .enterNumberOfBedrooms(testData.formData.bedrooms)
            .enterNumberOfRooms(testData.formData.rooms)
            .enterNumberOfBathrooms()
            .clickUnitAmenitiesDropdown()
            .checkListOfCheckboxesByQa(testData.formData.amenitiesQaAttr)
            .clickUnitAmenitiesDropdown()
            .clickSubmitCompButton();
        Income._Residential.RentComps.BaseActions.verifyComparableBedroomTableByNumber(0, testData.formData);
    });
});