import { createReport, deleteReport } from "../actions/base/baseTest.actions";
import testData from "../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4322.fixture";
import mapKeysUtils from "../utils/mapKeys.utils";
// import NavigationSection from "../../../../../actions/base/navigationSection.actions";
// import Income from "../../../../../actions/income/income.manager";
// import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Basis of Rent tooltip", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.log(window.localStorage.getItem("jwToken")).pause();
        deleteReport(testData.reportCreationData.reportNumber);

        /**
         * TODO: move this to the custom command
         * and note on how it work (especially reference to WebApp code and possible deprecation of this removal approach)
         */
        cy.log("Delete report");
        cy._mapGet(mapKeysUtils.report_id).then(reportId => {
            cy.request({
                method:"DELETE",
                url:`${Cypress.config().baseUrl}/report/${reportId}`,
                auth:{
                    'bearer': window.localStorage.getItem("jwToken")
                }
            }).then((resp) => {
                expect(resp.status).to.eq(200);
            });
        });
        
    });
});