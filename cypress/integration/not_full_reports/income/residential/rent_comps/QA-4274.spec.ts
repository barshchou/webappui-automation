import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4274.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify Amenities drop-down field in the Map filter section on Rent Comps page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps();
        Income.Residential.RentComps.BaseActions.clickAmenitiesArrow()
            .checkListOfCheckboxesByQa(testData.amenitiesQaAttr)
            .clickAmenitiesArrow()
            .clickAmenitiesArrow()
            .uncheckListOfCheckboxesByQa(testData.amenitiesQaAttr)
            .clickAmenitiesArrow();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});