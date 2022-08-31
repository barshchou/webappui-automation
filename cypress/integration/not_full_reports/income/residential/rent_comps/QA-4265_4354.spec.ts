import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

const reportCreationData = ReportDataCreator.getReportData("4265_4354");

describe("Verify the popups with appropriate wording appears on switching from Unit search type to Building", () => {
    beforeEach("Login, create report", () => {
        createReport(reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToResidentialRentComps();
        Income.Residential.RentComps.BaseActions.verifyUnitSelected()
            .changeToBuildingSearch()
            .changeToUnitSearch();
    });
});