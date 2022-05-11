import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4270.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe(" Verify Bedrooms drop-down field in the Map filter section", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps()
            .verifyProgressBarNotExist();
        Income.Residential.RentComps.BaseActions.clickNumberOfBedroomsArrow()
            .checkListOfCheckboxesByQa(testData.numberOfBedroomsQaAttr)
            .clickSourceOfInfoButton()
            .clickNumberOfBedroomsArrow()
            .uncheckListOfCheckboxesByQa(testData.numberOfBedroomsQaAttr);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});