import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4537.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";

describe("[QA-4537] Verify the Commercial Unit # SF field functionality",
    { tags:[ "@property", "@commercial_units" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Proceed to the Property > Commercial Units page.`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
            cy.stepInfo(`2. Enter any value in the Commercial Unit # SF field (e.g. 300) and save the changes.`);
            _NavigationSection.navigateToCommercialUnits();
            testData.sfValues.forEach((value, index) => {
                Property._CommercialUnits.enterUnitSFByUnitIndex(value, index);
            });
    
            cy.stepInfo(`3. Proceed to the Income > Commercial > In-Place Rent Roll page and 
            verify that the value from step 2 is displayed in the SF column 
            of the Commercial In-Place Rent Roll Table.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.verifySFTotal(testData.sfValues);
            testData.sfValues.forEach((_, index) => {
                Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus, index);
            });

            cy.stepInfo(`4. Proceed to the Income > Commercial > Stabilized Rent Roll 
            and verify that the value from step 2 
            is displayed in the SF column of the Commercial Stabilized Rent Roll Table.`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll.verifySFCells(testData.sfValues);

            cy.stepInfo(`5. Move back to the Property > Commercial Units page, remove the value 
            from the Commercial Unit # SF field, save the changes.`);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits
                .verifyUnitSFInscribedByUnitIndex(testData.verifySFValues, testData.numberOfCommercialUnits);
    
            cy.stepInfo(`6. Proceed again to the Income > Commercial > In-Place Rent Roll page 
            and verify that the value in the SF column is removed too.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.StabilizedRentRoll.verifySFCells([]);

            cy.stepInfo(`7. Proceed to the Income > Commercial > Stabilized Rent Roll 
            and verify that the value in the SF column is removed too.`);
            _NavigationSection.navigateToCommercialUnits();
            Income._CommercialManager.StabilizedRentRoll.verifySFCells([]);
        });
    });