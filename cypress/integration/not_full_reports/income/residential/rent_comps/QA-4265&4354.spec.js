import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

const reportCreationData = ReportDataCreator.getDefaultReportData("4265&4354");

describe("Verify the popups with appropriate wording appears on switching from Unit search type to Building", () => {
    before("Login, create report", () => {
        createReport(reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps();
        Income.Residential.RentComps.BaseActions.verifyUnitSelected()
            .changeToBuildingSearch()
            .changeToUnitSearch();
        deleteReport(reportCreationData.reportNumber);
    });
});