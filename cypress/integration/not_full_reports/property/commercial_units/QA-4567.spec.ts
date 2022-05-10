import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4567.fixture";
import { Base, Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the Save button functionality on the Commercial Units page", () => {

    before("Login, create report", () => {

        cy.stepInfo(` 1. Report creation and several commercial units addition`);
        createReport(testData.reportCreationData);
        Base._NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
    });


    it("Test body", () => {

        cy.stepInfo("2.  Proceed to the Property > Commercial Units page.");
        _NavigationSection.navigateToCommercialUnits();
        

        cy.stepInfo("3.  Verify the Save button is displayed on the Commercial Units page");
        Property._CommercialUnits.verifyThatPageIsOpened();
        Property._CommercialUnits.Page.SaveBtn.should('exist');

        cy.stepInfo("4.  Fill in the editable fields with values or/and check check-boxes or/and click the radio button and click on the Save button.");
       









        cy.stepInfo("5.  Refresh the page / or re-enter the page and verify that the changes from step 2 are still applied.");
        

       // deleteReport(testData.reportCreationData.reportNumber);
    });
});