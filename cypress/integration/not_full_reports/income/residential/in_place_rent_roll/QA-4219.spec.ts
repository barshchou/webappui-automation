import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4219.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";

const reportCreationData = ReportDataCreator.getReportData("4219");

describe("Verify the # column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.verifyColumnExist(testData.columnName)
                .verifyNumberOfNumberCells();
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.verifyNumberOfNumberCells(testData.numberOfUnits);
        });
    });