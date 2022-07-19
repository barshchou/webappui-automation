/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReviewExport, Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5136.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import mapKeysUtils from '../../../../utils/mapKeys.utils';

describe(`Check the order of comps in the export when 'custom' dropdown is chosen`, 
{ tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
    
    it("Test body", () => {
        createReport(testData.reportCreationData);

        cy.stepInfo(`[QA-5136] -> Verify that the order the comps are in by page save 
                    will inform their order from left to right in the report webapp 
                    on the adjustment page (Sale > Adjust Comps)`);

        cy.stepInfo(`1. [QA-5136] -> User navigates to SalesComps Search page `);
        _NavigationSection.navigateToFindComps();
        
        cy.stepInfo(`2. [QA-5136] -> User selects n-first comps from map`);
        testData.compsToAdd.forEach(() => {
            Sales._FindComps.Actions.selectCompFromMap();
        });

        cy.stepInfo(`3. [QA-5136] -> User navigates to the Sales Adjustment Grid`);
        _NavigationSection.Actions.clickSaveButton().navigateToAdjustComps();

        cy.stepInfo(`4. [QA-5136] -> User see that the order of comps from left to right
                    is the same as the order of Sales Comps in Selected Comparables Table`);
        Sales._AdjustComps.Page.CellCompHeader.spread((...comps) => {
            comps = comps.map(comp => comp.innerText);

            cy._mapGet(mapKeysUtils.sales_comps_addresses).then(_addresses => {
                // writing addresses into file so we can share this data between the test cases
                cy.writeFile(`./${mapKeysUtils.sales_comps_addresses}.txt`, _addresses);
                expect(_addresses).to.deep.equal(comps);
            });
        });

        cy.stepInfo(`5. [QA-5136] -> User navigates to Review&Export and downloads report`);
        _NavigationSection.Actions.openReviewAndExport();
        ReviewExport.Actions.generateDocxReport()
            .waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check report", () => {
        cy.stepInfo(`5. [QA-5136] -> User open report`);
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" })
        .then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);
         
            cy.readFile(`./${mapKeysUtils.sales_comps_addresses}.txt`).then(data => {

                // ernst: this step will be uncommented/removed when behavior will be explained
                // cy.stepInfo(`5. [QA-5136] -> User see that the order of Selected Comps
                // in 'Comparable Sales Adjustment Grid' section  are the same as the order on Sales Adjustment Grid`);
                // cy.contains("Comparable Sales Adjustment Grid").next()
                // .scrollIntoView().contains("Address")
                // .parents("tr").find("p").spread((...addresses) => {
                //     addresses = addresses.map(a => a.innerText).splice(-2).map(a => a.split(",")[0]);
                //     cy.log(<any>addresses);
                //     expect(JSON.parse(data)).to.deep.equal(addresses);
                // });

                cy.stepInfo(`5. [QA-5136] -> User see that the order of Selected Comps
                            in 'Comparable Sales Outline' section are the same as the order on Sales Adjustment Grid`);
                testData.compsToAdd.forEach(index => {
                    cy.contains(`Comparable Sale ${index+1}`).scrollIntoView().next()
                        .contains(JSON.parse(data)[index]).should("exist");
                });
            });
        });
    });
});