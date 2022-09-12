import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

const reportCreationData = ReportDataCreator.getReportData("4265_4354");

describe("Verify the popups with appropriate wording appears on switching from Unit search type to Building", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(reportCreationData);
        });

        it("[QA-4265][QA-4354]", () => {
            NavigationSection.navigateToResidentialRentComps();
            Income.Residential.RentComps.BaseActions.verifyUnitSelected()
                .changeToBuildingSearch()
                .changeToUnitSearch();
        });
    });