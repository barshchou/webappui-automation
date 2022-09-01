import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4268.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify Min Rent and Max Rent text fields", () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4268]", () => {
        NavigationSection.navigateToResidentialRentComps()
            .verifyProgressBarNotExist();
        Income.Residential.RentComps.BaseActions.verifyUnitSelected()
            .enterValueToInput("minRent", testData.minRentOk)
            .enterValueToInput("minRent", testData.minRentMore2Digits)
            .enterValueToInput("maxRent", testData.maxRentOk)
            .enterValueToInput("maxRent", testData.maxRentMore2Digits);
    });
});