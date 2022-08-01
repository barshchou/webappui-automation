import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4268.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify Min Rent and Max Rent text fields", () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps()
            .verifyProgressBarNotExist();
        Income.Residential.RentComps.BaseActions.verifyUnitSelected()
            .enterValueToInput("minRent", testData.minRentOk)
            .enterValueToInput("minRent", testData.minRentMore2Digits)
            .enterValueToInput("maxRent", testData.maxRentOk)
            .enterValueToInput("maxRent", testData.maxRentMore2Digits);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});