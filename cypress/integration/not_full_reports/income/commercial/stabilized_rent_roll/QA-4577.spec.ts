import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4577.fixture";
import { Tag } from "../../../../../utils/tags.utils";


describe("Verify the functionality of the Frontage radio button", { tags: [ Tag.income, Tag.commercial, Tag.stabilized_rent_roll ] }, () => {
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
        .clickCommercialArrow().navigateToStabilizedRentRollInCommercial().verifyProgressBarNotExist();
        
        cy.stepInfo(`2. Hover the arrows.`);
        Income._CommercialManager.RentReconciliation.Page.arrowCommercialRentReconciliation
        .trigger("mouseover").invoke("show");

        cy.stepInfo(`3. Verify the following text is displayed: "Go To Commercial Rent Reconciliation".`);
        cy.get('[role="tooltip"]').invoke("text").then(text => {
            cy.log(text);
            expect(text).to.be.equal("Go To Commercial Rent Reconciliation");
        });

        cy.stepInfo(`4. Click on the arrows`);
        Income._CommercialManager.RentReconciliation.Page.arrowCommercialRentReconciliation
        .click();
        Income._CommercialManager.StabilizedRentRoll.Actions
        .clickYesButton().verifyProgressBarNotExist();
        
        cy.stepInfo(`5. Verify that the Income > Commercial > Rent Reconciliation page is displayed.`);
        Income._CommercialManager.RentReconciliation.Page.RentReconcillationHeader
        .should("be.visible")
        .find("h5")
        .invoke("text")
        .then(text => {
            expect(text).to.be.equal(testData.headerText);
        });
        Income._CommercialManager.RentReconciliation.Page.GeneratedCommentary
        .should("be.visible");

        deleteReport(testData.reportCreationData.reportNumber);
    });
});