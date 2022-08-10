import testData from 
    "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4245_88.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Property, Income } from "../../../../../actions";

describe("Verify the Monthly Total row in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("[QA-4245]", () => {
            cy.stepInfo(`1. Navigate to Property -> Summary and enter number of residential units`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.numberOfUnits);

            cy.stepInfo(`2. Navigate to Income -> Residential -> In-Place Rent Roll and make sure 
            that the Monthly Total row is displayed in the grid (not editable, default = 0.00$).`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.verifyMonthlyTotalRentValue();
        
            cy.stepInfo(`3. Verify the Monthly Total row is calculated 
            per formula = Monthly Rent ($) sum - vacant units' rents`);
            testData.residentialUnits.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.enterMonthlyRentByRowNumber(unit.monthlyRent, index)
                    .enterLeaseStatusByRowNumber(unit.leaseStatus, index);
            });
            Income._Residential.InPlaceRentRoll.verifyMonthlyTotalRentValue();
        });

        it("[QA-4288]", () => {
            cy.stepInfo("1. Navigate to Income -> Residential -> In-Place Rent Roll");
            _NavigationSection.navigateToResInPlaceRentRoll();

            cy.stepInfo(`Verify the Appraiser Commentary section on the In-Place Rent Roll page:
            1. Verify the Appraiser Commentary is free text input type;   
            2. Try to enter any numerical / non-integer / text value;
            3. Try to copy-paste;
            4. Verify a long value;
            5. The field is optional;`);
            testData.textValues.forEach(text => {
                Income._Residential.InPlaceRentRoll.enterAppraiserCommentary(text);
            });
            Income._Residential.InPlaceRentRoll.Page.rentRollAppraiserCommentary.invoke("val", testData.textValues[0]);
        });
    });