import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4204.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";

describe(" Verify the Number of Residential Units section on the In-Place Rent Roll page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", { tags: '@fix' }, () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.enterAllEqualRentTypeCells(testData.rentType)
            .verifyNumberOfResidentialUnits(testData.numberOfUnits)
            .goToPropSummaryWithSaveLeavingFirst();
        Property.Summary.verifyThatPageIsOpened(Property.Summary.Page.headerSection, testData.verifyUrl);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});