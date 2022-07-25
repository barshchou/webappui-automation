import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4236.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";
import RentRollPage from "../../../../../pages/income/residential/rentRoll.page";

describe("Verify the Square Footage column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
            NavigationSection.navigateToResInPlaceRentRoll();
            Income.Residential.InPlaceRentRoll.verifyColumnNotExist(testData.column)
                .checkPerUnitSquareFootage()
                .verifyColumnExist(testData.column)
                .enterSquareFootageByRow(testData.footageOk)
                .enterSquareFootageByRow(testData.footageLong);
            RentRollPage.squareFootageCells.eq(0).click().trigger("keydown", { keyCode: 46 })
                .should("have.text", "");
            deleteReport(testData.reportCreationData.reportNumber);
        });
    });