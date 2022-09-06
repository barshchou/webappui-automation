import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import RentCompsPage from "../../../../../pages/income/residential/rent_comps/rentComps.page";
import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";

const reportCreationData = ReportDataCreator.getReportData("4355");

describe(`Verify the user can switch to 'Building' type of search on clicking 'Search Per Building' button on 
'Are you sure you want to search Per Building?' waring overlay`, 
{ tags:[ "@income", "@commercial", "@in_place_rent_roll", "@fix" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(reportCreationData);
    });

    it("[QA-4355] ", () => {
        NavigationSection.navigateToResidentialRentComps();
        Income.Residential.RentComps.BaseActions.verifyUnitSelected()
            .changeToBuildingSearch()
            .verifyProgressBarNotExist();
        RentCompsPage.perBuildingFiltersButton.should("exist");
    });
});