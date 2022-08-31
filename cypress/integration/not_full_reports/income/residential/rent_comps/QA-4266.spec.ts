import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4266.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import RentCompsPage from "../../../../../pages/income/residential/rent_comps/rentComps.page";

describe("Verify the UI controls of the Map filter section when Unit type of search is selected", () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToResidentialRentComps()
            .verifyProgressBarNotExist();
        Income.Residential.RentComps.BaseActions.verifyUnitSelected();
        RentCompsPage.unitTypesWrapper.should("exist");
        RentCompsPage.numberOfBedroomsArrowButton.should("exist");
        RentCompsPage.amenitiesArrowButton.should("exist");
        RentCompsPage.minRentInput.should("exist");
        RentCompsPage.maxRentInput.should("exist");
        RentCompsPage.sourceOfInfoArrow.should("exist");
        RentCompsPage.maxSquareFeet.should("exist");
        RentCompsPage.minSquareFeet.should("exist");
        RentCompsPage.minDateValueInput.should("exist");
        RentCompsPage.maxDateValueInput.should("exist");
        RentCompsPage.resetFiltersButton.should("exist");
        const fieldName = "minRent";
        Income.Residential.RentComps.BaseActions.enterValueToInput(fieldName, testData.minRentOk)
            .clickResetFiltersButton()
            .verifyEnteredValueToInput(fieldName);
        RentCompsPage.numberOfFoundResults.should("exist").should("contain.text", "Results Found");
        RentCompsPage.sortByDropdown.should("exist");
        RentCompsPage.zoomInButton.should("exist");
    });
});