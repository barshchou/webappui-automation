import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-5637.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";

describe("Calculation of Market Condition adjustment", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Open Adjust comps page");
            NavigationSection.navigateToAdjustComps();

            cy.stepInfo("2. Verify Calculation Units options in the Sale Comparables Setup");
            testData.calculationUnits.forEach(val => {
                Sales.AdjustComps.checkCalculationUnitsRadio(val);
            });
        });
    });