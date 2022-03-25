import testData from "./../../../../../fixtures/not_full_reports/property/summary/QA-4607.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";



/**
 * ernst: This test needs to be skipped due to drag and drop issues,
 * since we could not interact with draggable components in Cypress
 * with all the possible hacks.
 * + we have "drag_and_drop" lable for this kind of tests
 * TODO: Make draggable components accessible to Cypress
*/

describe.skip("Verify the Commercial Stabilized Rent Roll table", () => {
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
        NavigationSection.Actions.clickPropertyButton()
        .verifyProgressBarNotExist()
        .clickCommercialUnits()
        .clickYesButton().verifyProgressBarNotExist();
        Property.CommercialUnits.enterUnitSFByUnitIndex(testData.squareFeet)
        .clickSaveButton();
        NavigationSection.Actions.clickIncomeApproachButton()
        .clickCommercialArrow().clickCommercialRentRollButton()
        .pause();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber("Vacant").pause();

        NavigationSection.Actions.clickIncomeApproachButton()
        .clickCommercialArrow().clickCommercialCompGroups()
        .clickYesButton().verifyProgressBarNotExist().pause();
        
        Income.Commercial.CompGroups.Actions.addCompGroup("QA_4607_Comp_Group").pause();
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
        `)

        deleteReport(testData.reportCreationData.reportNumber);
    });
});