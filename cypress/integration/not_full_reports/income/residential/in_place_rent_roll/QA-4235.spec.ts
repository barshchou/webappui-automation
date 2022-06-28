import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4235.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the # Bathrooms column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.verifyColumnNotExist(testData.column)
            .checkCheckboxByLabelAndVerify(testData.label, testData.column)
            .enterNumberBathroomsByRow(testData.wholeNumber)
            .enterNumberBathroomsByRow(testData.halfNumber)
            .enterNumberBathroomsByRow(testData.negativeNumber)
            .enterNumberBathroomsByRow(testData.wrongDecimal);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});