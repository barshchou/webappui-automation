/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReviewExport, Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5136.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import mapKeysUtils from '../../../../utils/mapKeys.utils';
import { _map } from '../../../../support/commands';

describe(`Check when "custom" dropdown is selected user can drag&drop comps`, 
{ tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
    
    it("Test body", () => {
        createReport(testData.reportCreationData);

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
                cy.writeFile(`./${mapKeysUtils.sales_comps_addresses}.txt`, _addresses);
                expect(_addresses).to.deep.equal(comps);
            });
        });

        cy.pause();

        _NavigationSection.Actions.openReviewAndExport();
        ReviewExport.Actions.generateDocxReport()
        .waitForReportGenerated()
        .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it.skip("debug", () => {
        const addresses = [ "45 East 45 Street", "8 Spruce Street" ];

        cy.get("body").then(() => {
            _map.set("addr", addresses);
        });
    });
    

    it("check report", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" })
        .then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);
         
            cy.readFile(`./${mapKeysUtils.sales_comps_addresses}.txt`).then(data => {

                // ernst: this step will be uncommented when behavior will be explained
                // cy.contains("Comparable Sales Adjustment Grid").next()
                // .scrollIntoView().contains("Address")
                // .parents("tr").find("p").spread((...addresses) => {
                //     addresses = addresses.map(a => a.innerText).splice(-2).map(a => a.split(",")[0]);
                //     cy.log(<any>addresses);
                //     expect(JSON.parse(data)).to.deep.equal(addresses);
                // });

                testData.compsToAdd.forEach(index => {
                    cy.contains(`Comparable Sale ${index+1}`).scrollIntoView().next()
                    .contains(JSON.parse(data)[index]).should("exist");
                });
            });
        });
    });
});