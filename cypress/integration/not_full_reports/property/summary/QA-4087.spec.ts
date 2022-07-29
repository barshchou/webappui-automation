import testData from "../../../../fixtures/not_full_reports/property/summary/QA-4087.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("[QA-4087] Verify validation of the Residential Units and Commercial Units fields.",
    { tags: [ "@property", "@summary" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Property > Summary`);
            _NavigationSection.navigateToPropertySummary();

            cy.stepInfo(`2. Verify validation of the Residential Units and Commercial Units fields. 
            The Numbers in these fields should be limited to 5000 units. 
            Check with:
                - empty fields
                - 0 (users can enter 0 as a valid number)
                - any value. from 1 to 4998
                - 4999
                - 5000
                - 5001
                - 1000000
                - copy-paste`);
            testData.verifyValues.forEach(value => {
                Property._Summary.enterNumberOfResUnits(value, testData.notInclude)
                    .enterNumberOfCommercialUnits(value, testData.notInclude);
                if (value > 5000) {
                    Property._Summary.Page.resUnitsInputValidationText("Max value is 5000").should("be.visible");
                    Property._Summary.Page.commercialUnitsInputValidationText("Max value is 5000").should("be.visible");
                }
            });

            Property._Summary.Page.numberOfResUnitsInput.clear().invoke('val', '');
            Property._Summary.Page.numberOfCommercialUnitsInput.clear().invoke('val', '');
            Property._Summary.Page.resUnitsInputValidationText("Required").should("be.visible");
            Property._Summary.Page.commercialUnitsInputValidationText("Required").should("be.visible");
        
            deleteReport(testData.reportCreationData.reportNumber);
        });
    });
