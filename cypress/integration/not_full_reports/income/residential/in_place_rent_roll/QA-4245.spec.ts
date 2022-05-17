import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4245.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Property, Income } from "../../../../../actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("Verify the Monthly Total row in the grid", 
    { tags:[ Tag.income, Tag.residential, Tag.in_place_rent_roll ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Property -> Summary and enter number of residential units");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.numberOfUnits);

        cy.stepInfo("2. Navigate to Income -> Residential -> In-Place Rent Roll and make sure that the Monthly Total row is displayed in the grid (not editable, default = 0.00$).");
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.verifyMonthlyTotalRentValue();
        
        cy.stepInfo("3. Verify the Monthly Total row is calculated per formula = Monthly Rent ($) sum - vacant units' rents");
        testData.residentialUnits.forEach((unit, index) => {
            Income._Residential.InPlaceRentRoll.enterMonthlyRentByRowNumber(unit.monthlyRent, index);
            Income._Residential.InPlaceRentRoll.enterLeaseStatusByRowNumber(unit.leaseStatus, index);
        });
        Income._Residential.InPlaceRentRoll.verifyMonthlyTotalRentValue();
        
        deleteReport(testData.reportCreationData.reportNumber);
    });
});