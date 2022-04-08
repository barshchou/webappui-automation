import { Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4577.fixture";


describe("Verify the functionality of the Frontage radio button", () => {
    before("Login, create report", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();
    });

    it("Test body", () => {
        cy.stepInfo(`1. Proceed to the Property > Commercial Units page.`);
        _NavigationSection.clickIncomeApproachButton()
        .clickCommercialArrow().openCommercialStabilizedRentRollInCommercial().pause();
        
        cy.stepInfo(`2. Hover the arrows.`);

        cy.stepInfo(`3. Verify the following text is displayed: "Go To Commercial Rent Reconciliation".`);

        cy.stepInfo(`4. Click on the arrows`);

        cy.stepInfo(`5. Verify that the Income > Commercial > Rent Reconciliation page is displayed.`);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});