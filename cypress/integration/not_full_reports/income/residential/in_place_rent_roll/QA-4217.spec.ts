import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4217.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the functionality of the Optional Columns checkboxes", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.checkUncheckCheckboxForColumn(testData.unitTypeLabelColumn, testData.unitTypeLabelColumn)
            .checkUncheckCheckboxForColumn(testData.bathColumn, testData.bathLabel)
            .checkUncheckCheckboxForColumn(testData.outdoorLabelAndColumn, testData.outdoorLabelAndColumn);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});