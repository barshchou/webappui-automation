import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4536.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Property} from "../../../../actions";

describe("[QA-4536] Verify the Commercial Unit # SF field depends on the No. of Commercial Units", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Property > Commercial Units page.");
        // _NavigationSection.navigateToPropertySummary();
        // Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        // _NavigationSection.navigateToCommercialUnits();
        
        cy.stepInfo("2. Verify that the Commercial Unit # field is enabled.");
        // Property._CommercialUnits.Page.numberCommercialUnitsField.should("be.disabled");
        // Property._CommercialUnits.Page.numberCommercialUnitsField.should("have.value", testData.numberOfCommercialUnits);

        cy.stepInfo("3. Proceed to the Property > Summary page and enter any value in the Commercial Units field (e.g. 3), save the changes.");
        // _NavigationSection.navigateToPropertySummary();
        // Property._Summary.enterNumberOfCommercialUnits(4);

        cy.stepInfo(`4. Move back to the Property > Commercial Units page and verify that the Commercial Unit 1 SF, 
            Commercial Unit 2 SF, Commercial Unit 3 SF fields are displayed.`);
        // _NavigationSection.navigateToCommercialUnits();

        cy.stepInfo("5. Proceed to the Property > Summary page again and enter “0“ in the Commercial Units field, save the changes.");
        // Property._CommercialUnits.Page.numberCommercialUnitsField.should("have.value", 4);

        cy.stepInfo("6. Move back to the Property > Commercial Units and verify that the Commercial Unit # SF field is NOT displayed.");

        deleteReport(testData.reportCreationData.reportNumber);
    });
});