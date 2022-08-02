import { createReport } from "../../../../../actions/base/baseTest.actions";
import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

const reportCreationData = ReportDataCreator.getReportData("4333");

describe(`Verify Select button for the results displayed in the Map section is transferring to Selected on clicking 
                when the Unit type of search is selected on the Rent Comps page`, () => {

    beforeEach("Login, create report", () => {
        createReport(reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps();
        Income.Residential.RentComps.BaseActions.verifyLoadingDoesNotExist()
            .verifyUnitSelected()
            .clickAllSelectComparableButtons()
            .verifyUncategorizedCompsNumberAsSelected();
    });
});