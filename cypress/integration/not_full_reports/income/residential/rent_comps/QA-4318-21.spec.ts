import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4318-21.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import AddCompFormPage from "../../../../../pages/income/residential/rent_comps/addCompForm.page";

describe(`Verify the UI elements of Add New Rent Comp overlay on Rent Comps page 
        when Unit type of search is selected`, 
{ tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4318-21]", () => {
        NavigationSection.navigateToResidentialRentComps();
        Income.Residential.RentComps.BaseActions.openAddNewComparableForm(testData.formData.address);
        AddCompFormPage.formHeader.should("exist");
        AddCompFormPage.propAddressField.should("have.text", testData.formData.address);
        cy.contains(testData.formData.cityDistrict).should("exist");
        AddCompFormPage.unitNumbFieldName.should("exist").should("have.text", "Unit Number");
        Income.Residential.RentComps.AddForm.enterUnitNumber(testData.formData.unitNumber);
        AddCompFormPage.monthRentFieldName.should("exist").should("contain.text", "Monthly Rent");
        Income.Residential.RentComps.AddForm.enterMonthlyRent(testData.formData.monthly);
        AddCompFormPage.squareFootageFieldName.should("exist").should("have.text", "Unit Square Footage");
        Income.Residential.RentComps.AddForm.enterSquareFootage(testData.formData.squareFootage);
        AddCompFormPage.numberOfBedroomsFieldName.should("exist").should("contain.text", "Number of Bedrooms");
        Income.Residential.RentComps.AddForm.enterNumberOfBedrooms(testData.formData.bedrooms);
        AddCompFormPage.numberOfRoomsFieldName.should("exist").should("contain.text", "Number of Rooms");
        Income.Residential.RentComps.AddForm.enterNumberOfRooms(testData.formData.rooms);
        AddCompFormPage.numberOfBathFieldName.should("exist").should("have.text", "Number of Bathrooms");
        Income.Residential.RentComps.AddForm.enterNumberOfBathrooms(testData.formData.numberOfBathOk)
            .enterNumberOfBathrooms(testData.formData.numberOfBathWrong);
        AddCompFormPage.unitAmenitiesFieldName.should("exist").should("have.text", "Unit Amenities");
        Income.Residential.RentComps.AddForm.clickUnitAmenitiesDropdown()
            .checkListOfCheckboxesByQa(testData.formData.amenitiesQaAttr);
        AddCompFormPage.numberOfBathInput.click();
        Income.Residential.RentComps.AddForm.clickUnitAmenitiesDropdown()
            .uncheckListOfCheckboxesByQa(testData.formData.amenitiesQaAttr)
            .clickUnitAmenitiesDropdown();
        AddCompFormPage.unitTypeFieldName.should("exist").should("have.text", "Unit Type");
        Income.Residential.RentComps.AddForm.selectListUnitTypes(testData.formData.unitTypes);
        AddCompFormPage.dateOfValueFieldName.should("exist").should("contain.text", "Date of Value");
        Income.Residential.RentComps.AddForm.enterDate()
            .clearDateInput()
            .enterDate(testData.formData.wrongFormatDate)
            .clearDateInput()
            .chooseDayOfCurrentMonthInPicker();
        AddCompFormPage.sourceOfInfoFieldName.should("exist").and("contain.text", "Source of Information");
        Income.Residential.RentComps.AddForm.verifySourceUrlNotExist()
            .verifySourceNameNotExist()
            .selectSourceOfInfoAndVerify(testData.formData.infoSources[1])
            .enterSourceUrl(testData.formData.sourceUrl)
            .enterSourceName(testData.formData.sourceName)
            .selectSourceOfInfoAndVerify(testData.formData.infoSources[0])
            .verifySourceNameNotExist()
            .verifySourceUrlNotExist()
            .selectSourceOfInfoAndVerify(testData.formData.infoSources[2])
            .verifySourceUrlNotExist()
            .enterSourceName(testData.formData.sourceName)
            .enterInternalNotes(testData.formData.internalNotes);
        AddCompFormPage.cancelButton.should("exist").and("have.text", "Back to Results");
        AddCompFormPage.submitCompButton.should("exist").and("have.text", "Add Unit");
    });
});