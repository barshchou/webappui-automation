import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4339.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";

describe(`Verify clicking Add Unit button on Add New Rent Comp overlay is adding the unit to the appropriate group 
                of comparable units on the Rent Comps page (Unit type of search is selected)`,
{ tags:[ "@income", "@residential", "@rent_comps" ] }, () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.enterAllEqualRentTypeCells(testData.rentType)
            .enterBedroomsNumberByRowNumber(testData.numberOfBedrooms)
            .checkCheckboxByLabel(testData.includePerRoomCheckbox);
        NavigationSection.navigateToCommercialCompGroups();
        Income.Residential.RentComps.BaseActions.verifyUnitSelected()
            .openAddNewComparableForm(testData.formData.address);
        Income.Residential.RentComps.AddForm.enterUnitNumber(testData.formData.unitNumber)
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
        Income.Residential.RentComps.BaseActions.verifyComparableBedroomTableByNumber(0, testData.formData);
    });
});