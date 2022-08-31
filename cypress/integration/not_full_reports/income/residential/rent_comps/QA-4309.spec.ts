import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

const reportCreationData = ReportDataCreator.getReportData("4309");

describe("Verify Zoom in and Zoom out buttons for the map on Rent Comps page when Unit search type is selected", () => {
    beforeEach("Login, create report", () => {
        createReport(reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToResidentialRentComps()
            .verifyProgressBarNotExist();
        Income.Residential.RentComps.BaseActions.verifyUnitSelected()
            .clickZoomInButton()
            .clickZoomOutButton();
    });
});