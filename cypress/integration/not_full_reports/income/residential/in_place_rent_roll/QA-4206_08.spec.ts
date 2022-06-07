import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4206_08.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { reportCreationData } from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4206_08.fixture";

describe("Verify the Developer's Forecast checkbox on the In-Place Rent Roll page", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {

    it("Test body", () => {
        testData.conclusionValues.forEach(value => {
            createReport(reportCreationData(value));

            NavigationSection.navigateToResInPlaceRentRoll();
            Income.Residential.InPlaceRentRoll.verifyColumnNotExist(testData.column.devForecast)
                .verifyColumnNotExist(testData.column.perRoom)
                .checkUncheckCheckboxForColumn(testData.column.devForecast, testData.label.devForecast)
                .checkUncheckCheckboxForColumn(testData.column.perRoom, testData.label.perRoom);
            deleteReport(reportCreationData(value).reportNumber);
        });
    });
});