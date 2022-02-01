import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4237.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Outdoor Space column in the grid", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.checkCheckboxByLabelAndVerify(testData.labelAndColumn, testData.labelAndColumn);
        testData.spaceOptions.forEach(option => {
            Income.Residential.InPlaceRentRoll.enterOutdoorSpaceByOptionByRow(option);
        });
        Income.Residential.InPlaceRentRoll.pressDeleteOutdoorSpaceByRow();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});