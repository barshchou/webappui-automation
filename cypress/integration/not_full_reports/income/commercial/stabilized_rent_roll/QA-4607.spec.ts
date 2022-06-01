import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4607.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";

/**
 * ernst: This test needs to be skipped due to drag and drop issues,
 * since we could not interact with draggable components in Cypress
 * with all the possible hacks.
 * + we have "drag_and_drop" lable for this kind of tests
 * TODO: Make draggable components accessible to Cypress
*/

    describe.skip("Verify the Commercial Stabilized Rent Roll table", 
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        cy.stepInfo(`
        Preconditions: 
        - The mixed report is created and several commercial units are added;
        - On the Property Commercial Unit, the Commercial Unit # SF is filled by any value;
        - On the Income > Commercial > In-Place Rent Roll, the “Vacant“ value is selected in the Lease Status column for all commercial units;
        - On the Income > Commercial > Comp Groups, a new Comp Group has been created with added Comps;
        - On the Income > Commercial > Rent Comps, several comps have been added for comparison into a new Created Group from the previous step;
        - On the Income > Commercial > Rent Reconciliation, the Market Rent Conclusion field is filled with any value;
        `);
        createReport(testData.reportCreationData);
        _NavigationSection.Actions.clickPropertyButton()
            .verifyProgressBarNotExist()
            .clickCommercialUnits()
            .clickYesButton().verifyProgressBarNotExist();
        Property._CommercialUnits.enterUnitSFByUnitIndex(testData.squareFeet)
            .clickSaveButton();
            _NavigationSection.Actions.clickIncomeApproachButton()
            .clickCommercialArrow()
            .clickCommercialRentRollButton();
        
        Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber("Vacant");

        _NavigationSection.Actions.clickIncomeApproachButton()
        .clickCommercialArrow().clickCommercialCompGroups()
        .clickYesButton().verifyProgressBarNotExist();
        
        let compGroup = "QA_4607_Comp_Group";
        Income._CommercialManager.CompGroups.addCompGroup(compGroup);

        const subject = cy.get(Income._CommercialManager.CompGroups.Page.getDragableElement(1));
        subject.dragAndDrop(Income._CommercialManager.CompGroups.Page.getDragableElement(1), 
            Income._CommercialManager.CompGroups.Page.getDragableArea(compGroup, 1));

    });

    it("Test body", () => {  
        cy.stepInfo(`
        1. Proceed to the Income > Commercial > Stabilized Rent Roll page.
        `);
    
        cy.stepInfo(`
        2. Click on the Autofill Vacant Units button and verify the Rent PSF column is auto-filled 
        (Note: Annual and Monthly Rent columns are disabled).
        `);
        
        cy.stepInfo(`
        3. Verify that the value in the Rent PSF = the Market Rent Conclusion value.
        `);

        cy.stepInfo(`
        4. Verify the Annual Rent is calculated correctly per formula: Rent PSF col.* SF col.
        `);

        cy.stepInfo(`
        5. Verify the Monthly Rent is calculated correctly per formula: (Rent PSF col.* SF col.)/12.
        `);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});