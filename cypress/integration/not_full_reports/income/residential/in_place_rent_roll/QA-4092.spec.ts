import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4092.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, DataCollections } from "../../../../../actions";

describe(`[QA-4092] Verify if "Per Year" time period PSF Rent based on is selected - > 
    the calculation of "Rent PSF" should be Monthly Rent *12/Square Footage/`, 
{ tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Income > Residential > In-Place Rent Roll.");
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.resUnit);
        _NavigationSection.navigateToResInPlaceRentRoll();

        cy.stepInfo(`2. Verify if calculation is correct if:
            Square Footage is 0
            Square Footage is not filled
            Monthly rent is 0    
            Monthly rent is not filled`);
        testData.cases.forEach(el => {
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage()
                .enterSquareFootageByRow(el.squareFootage)
                .enterMonthlyRentByRowNumber(el.monthlyRent)
                .verifyRentPSFValueByRow(false);
            cy.reload();
        });
    });
});