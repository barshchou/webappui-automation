import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4555.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Property} from "../../../../actions";

describe("[QA-4555] Verify the functionality of the Commercial Unit button", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Property > Commercial Units page.");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();
        
        cy.stepInfo("2. Verify that the No. of Commercial Unit button depends on No. of Commercial Units on the Property Summary page ");
        Property._CommercialUnits.Page.commercialUnitField.should("have.length", testData.numberOfCommercialUnits);
        Property._CommercialUnits.Page.commercialUnitsTabs.should("have.length", testData.numberOfCommercialUnits);

        cy.stepInfo("3. Verify that each Commercial Unit # button can be selected and it’s underlined.");
        for(let i = 0; i < testData.numberOfCommercialUnits; i++) {
            Property._CommercialUnits.clickCommercialUnitTabByIndex(i);
            Property._CommercialUnits.Page.commercialUnitsTabs.should("have.focus");
        }

        deleteReport(testData.reportCreationData.reportNumber);
    });
});