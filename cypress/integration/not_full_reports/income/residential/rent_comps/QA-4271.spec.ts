import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4271.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Source of Information drop-down field in the when Unit type of search is selected", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps()
            .verifyProgressBarNotExist();
        Income.Residential.RentComps.BaseActions.clickSourceOfInfoButton()
            .checkListOfCheckboxesByQa(testData.sourceOfInfoQaAttr)
            .clickSourceOfInfoButton()
            .clickSourceOfInfoButton()
            .uncheckListOfCheckboxesByQa(testData.sourceOfInfoQaAttr);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});