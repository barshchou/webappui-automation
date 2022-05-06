import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4535.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Property} from "../../../../actions";

describe("[QA-4535] Verify the No. of Commercial Units field", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Property > Commercial Units page.");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();
        
        cy.stepInfo(`2. Verify that the No. of Commercial Units field is disabled and the number of Commercial Units
            (from Property > Summary page) is displayed inside the field.`);
        Property._CommercialUnits.Page.numberCommercialUnitsField.should("be.disabled");
        Property._CommercialUnits.Page.numberCommercialUnitsField.should("have.value", testData.numberOfCommercialUnits);

        cy.stepInfo("3. Proceed to the Property > Summary page, change the Number of Commercial Units and save the changes.");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(4);

        cy.stepInfo("4. Proceed back to the Property > Commercial Units page.");
        _NavigationSection.navigateToCommercialUnits();

        cy.stepInfo("5.Verify that the correct Number of Commercial Units is displayed inside the No. of Commercial Units field.");
        Property._CommercialUnits.Page.numberCommercialUnitsField.should("have.value", 4);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});