import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4236.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";

describe("Verify the Square Footage column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.verifyColumnNotExist(testData.column)
                .checkPerUnitSquareFootage()
                .verifyColumnExist(testData.column)
                .enterSquareFootageByRow(testData.footageOk)
                .enterSquareFootageByRow(testData.footageLong);
            Income._Residential.InPlaceRentRoll.Page.squareFootageCells.eq(0)
                .click().trigger("keydown", { keyCode: 46 }).should("have.text", "");
        });
    });