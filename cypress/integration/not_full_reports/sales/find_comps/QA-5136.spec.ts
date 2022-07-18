/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5136.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import mapKeysUtils from '../../../../utils/mapKeys.utils';

describe(`[QA-5136] Check when "custom" dropdown is selected user can drag&drop comps`, 
{ tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`[QA-5136] -> Verify when “custom” is selected, the user can drag and drop Selected comps up and down in the list.
                    NOTE: The drag and drop functionality is disabled when Sort: Sale Date is selected`
        );

        cy.stepInfo(`1. [QA-5136] -> User navigates to SalesComps Search page `);
        _NavigationSection.navigateToFindComps();
        
        cy.stepInfo(`2. [QA-5136] -> User selects n-first comps from map`);
        testData.compsToAdd.forEach(() => {
            Sales._FindComps.Actions.selectCompFromMap();
        });

        cy.stepInfo(`5.1. [QA-5136] -> User can move selected comparable down the list by drag-and-drop`);
        Sales._FindComps.Page.addressSalesComparablesTable.spread((...comps) => {
            comps = comps.slice(1).map(elem => elem.innerText);
            cy.wrap(comps).as(testData.aliasCompsBefore);

            cy.get(`@${testData.aliasCompsBefore}`).then(_before => cy.log(<any>_before));     
        });

        // cy.stepInfo(`5.2. [QA-5136] -> User see that order of comps changed`);
        _NavigationSection.Actions.pause().clickSaveButton().navigateToAdjustComps();

        cy.get('[data-qa="sales-adjustment-grid-header-row"] [data-qa="comp-header-cell"]')
        .spread((...comps) => {
            comps = comps.map(comp => comp.innerText);

            cy.wrap(comps).as("comps_");

            cy.get(`@comps_`).then(_comps => cy.log(<any>_comps));

            cy._mapGet(mapKeysUtils.sales_comps_addresses).then(_addresses => {
                expect(_addresses).to.deep.equal(comps);
            });
        });

        cy.pause();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});