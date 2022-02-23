import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4219.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";

const reportCreationData = ReportDataCreator.getDefaultReportData("4219");

describe("Verify the # column in the grid", () => {
    before("Login, create report", () => {
        createReport(reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.verifyColumnExist(testData.columnName)
            .verifyNumberOfNumberCells();
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.verifyNumberOfNumberCells(testData.numberOfUnits);
        deleteReport(reportCreationData.reportNumber);
    });
});