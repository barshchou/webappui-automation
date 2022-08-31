import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4274.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify Amenities drop-down field in the Map filter section on Rent Comps page", () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToResidentialRentComps();
        Income.Residential.RentComps.BaseActions.clickAmenitiesArrow()
            .checkListOfCheckboxesByQa(testData.amenitiesQaAttr)
            .clickUnitTypesArrowButton()
            .clickUnitTypesArrowButton()
            .clickAmenitiesArrow()
            .uncheckListOfCheckboxesByQa(testData.amenitiesQaAttr)
            .clickAmenitiesArrow();
    });
});