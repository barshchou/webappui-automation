/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5134.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5134] Check when "custom" dropdown is selected user can drag&drop comps`, 
    { tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`[QA-5134] -> Verify when “custom” is selected, the user can drag and drop 
            Selected comps up and down in the list. NOTE: The drag and drop functionality 
            is disabled when Sort: Sale Date is selected`);

            cy.stepInfo(`1. [QA-5134] -> User navigates to SalesComps Search page `);
            _NavigationSection.navigateToFindComps();
        
            cy.stepInfo(`2. [QA-5134] -> User selects n-first comps from map`);
            testData.compsToAdd.forEach(() => {
                Sales._FindComps.Actions.selectCompFromMap();
            });

            cy.stepInfo(`3. [QA-5134] -> When sort for Selected Comparables set to "Sale Date",
                    then user unable to sort selected comparables by drag-and-drop`);
            cy.get(Sales._FindComps.Page.selectorDraggableElement).should("not.exist");

            cy.stepInfo(`4. [QA-5134] -> User set "Custom" sort for Selected Comparables`);
            Sales._FindComps.Actions.selectedCompsSetSort("Custom");

            cy.stepInfo(`5.1. [QA-5134] -> User can move selected comparable down the list by drag-and-drop`);
            Sales._FindComps.Page.addressSalesComparablesTable.spread((...comps) => {
                comps = comps.slice(1).map(elem => elem.innerText);
                cy.wrap(comps).as(testData.aliasCompsBefore);
                cy.get(`@${testData.aliasCompsBefore}`).then(_before => cy.log(<any>_before));
                Sales._FindComps.moveComparableByDnD(Sales._FindComps.Page.selectorDraggableElement, 0, "down", 2);
            });

            cy.stepInfo(`5.2. [QA-5134] -> User see that order of comps changed`);
            Sales._FindComps.Page.addressSalesComparablesTable.spread((...comps) => {
                comps = comps.slice(1).map(elem => elem.innerText);
                cy.wrap(comps).as(testData.aliasCompsAfter);
            
                cy.get(`@${testData.aliasCompsAfter}`).then((_after) => {
                    cy.log(<any>_after);
                    cy.get(`@${testData.aliasCompsBefore}`).then((_before) => {
                        expect(_after).to.not.deep.equal(
                            _before, "Sales Comparables has different order after DnD (by addresses)."
                        );
                    });
                });
            });

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });