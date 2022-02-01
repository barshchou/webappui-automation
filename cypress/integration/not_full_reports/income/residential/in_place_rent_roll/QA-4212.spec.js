import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4212.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Do you know per unit square footage? section", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.checkUncheckPerUnitSquareFootage(testData.columns);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});