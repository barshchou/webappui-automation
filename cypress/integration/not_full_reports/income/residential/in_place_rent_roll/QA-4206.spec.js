import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4206.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Developer's Forecast checkbox on the In-Place Rent Roll page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.verifyColumnNotExist(testData.column)
            .checkUncheckCheckboxForColumn(testData.column, testData.label);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});