import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4698.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";

describe("Verify the Monthly Total row in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Navigate to Property -> Summary and enter number of residential units");
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);

            cy.stepInfo("2. Navigate to Income -> Residential -> In-Place Rent Roll");
            _NavigationSection.navigateToResInPlaceRentRoll();
        
            cy.stepInfo("3. Verify Rent PSF/Month value in the Grid is displayed with 2 decimals places");
            testData.residentialUnits.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.enterMonthlyRentByRowNumber(unit.monthlyRent, index)
                    .enterLeaseStatusByRowNumber(unit.leaseStatus, index);
            });
            Income._Residential.InPlaceRentRoll.verifyMonthlyTotalRentValue();
        });
    });