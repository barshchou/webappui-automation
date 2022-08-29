import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4577.fixture";
import { _IncomeTitles } from "../../../../../enums/pages_titles";

describe("Verify the functionality of the Frontage radio button", 
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.
                    Comp group is created.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialCompGroups();
            Income._CommercialManager.CompGroups.addCompGroup(testData.compGroup);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Proceed to the Property > Commercial Units page.`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
        
            cy.stepInfo(`2. Hover the arrows.`);
            Income._CommercialManager.RentReconciliation.Page.arrowCommercialRentReconciliation
                .trigger("mouseover")
                .invoke("show");

            cy.stepInfo(`3. Verify the following text is displayed: "Go To Commercial Rent Reconciliation".`);
            cy.get('[role="tooltip"]').invoke("text").then(text => {
                cy.log(text);
                expect(text).to.be.equal("Go To Commercial Rent Reconciliation");
            });

            cy.stepInfo(`4. Click on the arrows`);
            Income._CommercialManager.RentReconciliation.Page.arrowCommercialRentReconciliation.click();
            Income._CommercialManager.StabilizedRentRoll.Actions.clickYesButton()
                .verifyProgressBarNotExist();
        
            cy.stepInfo(`5. Verify that the Income > Commercial > Rent Reconciliation page is displayed.`);
            Income._CommercialManager.RentReconciliation.Page.RentReconciliationHeader
                .should("be.visible")
                .find("h5")
                .invoke("text")
                .then(text => {
                    expect(text).to.be.equal(_IncomeTitles._Commercial.RENT_RECONCILIATION);
                });
            Income._CommercialManager.RentReconciliation.Page.GeneratedCommentary
                .should("be.visible");
        });
    });