import { loginAction } from "../../../../../actions/base/baseTest.actions";

const reportIdAlias = "report_id";

describe(" Verify that changes are displayed for Annual and Monthly Rent columns, # column in the export.", () => {
    before("Login, create report", () => {
        cy.stepInfo(`1. Proceed to the Income Approach > 
        Commercial Stabilized Rent Roll and fill all fields on the WebApp.`);
        loginAction();
        /**
         * ernst: We can intercept report_id in before hook and memorize it with "as" command.
         * And then access it in test body
         */
        // createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`
        Go to the Commercial Stabilized Rent Roll table in the export and check:
            - removed the leading # column;
            - removed the decimal place for Annual Rent, represent as a whole number;
            - removed the decimal place for Monthly Rent, represent as a whole number. 
        `);
        /**
         * Genereated test body will be below
         */
        /**
         * Before refactor (raw generated test body)
         */
        /* ==== Generated with Cypress Studio ==== */
        /*
         *  cy.get('.jss16 > .jss52 > .jss27').click();
         *  cy.get('.jss364 > .jss362 > .jss331 > .jss341').clear();
         *  cy.get('.jss364 > .jss362 > .jss331 > .jss341').type('462 1st Avenue, New York, USA{enter}');
         *  cy.get('.jss364 > .jss362 > .jss331 > .jss341').click();
         *  cy.get('[data-suggestion-index="0"]').click();
         *  cy.get('.jss126 > :nth-child(2) > .jss52 > .jss27').click();
         *  cy.get('[data-qa="search-results-table-owner-cell"]').click();
         *  cy.get('.jss126 > :nth-child(2) > .jss52 > .jss27').click();
         *  cy.get('[name="reportNumber"]').clear();
         *  cy.get('[name="reportNumber"]').type('cypress-studio-generated');
         *  cy.get('[name="settings.templateType"][value="freddie-mac"] ').click();
         *  cy.get('[name="settings.incomeType"][value="multifamily"]').check();
         *  cy.get('[value="AS_IS"]').click();
         *  cy.get(':nth-child(4) > .jss362 > .jss665 > :nth-child(1) > .jss436 > 
         * :nth-child(1) > :nth-child(1)').click();
         *  cy.get(':nth-child(4) > .jss362 > .jss665 > :nth-child(1) > .jss52 > .jss477 > .jss681').check();
         *  cy.get('[align="right"] > .jss52 > .jss27').click();
         *  cy.get('.jss845 > .jss1216').click();
         *  cy.get('a > :nth-child(1) > div > .injected-svg').click();
         *  cy.get('[aria-describedby="mui-tooltip-37036"] > .svg-inline--fa').click();
         */
        /* ==== End Cypress Studio ==== */

        /**
         * After refactor (we need to change some selectors due to their flakiness)
         */
        cy.get('.jss16 > .jss52 > .jss27').click();
        cy.get('.jss364 > .jss362 > .jss331 > .jss341').clear();
        cy.get('.jss364 > .jss362 > .jss331 > .jss341').type('462 1st Avenue, New York, USA{enter}');
        cy.get('.jss364 > .jss362 > .jss331 > .jss341').click();
        cy.get('[data-suggestion-index="0"]').click();
        cy.get('.jss126 > :nth-child(2) > .jss52 > .jss27').click();
        cy.get('[data-qa="search-results-table-owner-cell"]').click();
        cy.get('.jss126 > :nth-child(2) > .jss52 > .jss27').click();
        cy.get('[name="reportNumber"]').clear();
        cy.get('[name="reportNumber"]').type('cypress-studio-generated');
        cy.get('[name="settings.templateType"][value="freddie-mac"] ').click();
        cy.get('[name="settings.incomeType"][value="multifamily"]').check();
        cy.get('[value="AS_IS"]').click();
        cy.get('[data-qa="create-report-settings-modal"] [data-qa="create-report-btn"]').click();
        cy.get('[data-qa="form-save-btn"]').click();
        //#region NOT GENERATED PART
        cy.url().then(val => {
            let url = new URL(val);
            let routes = url.pathname.replace(/\//g, " ").split(" ");
            cy.wrap(routes[routes.length-2]).as(reportIdAlias);
        });
        //#endregion        
        cy.get('[href="/reports"]').click();
        /**
         * ernst: we can try to look for generated report not by xpath (as we do now),
         * but with [href=`/report/${report_id}`] [data-qa="archive-btn"], 
         * where report_id can be intercepted during the test
         */
        cy.get(`@${reportIdAlias}`).then(val => {
            cy.log(`${val}`);
            cy.get(`[href="/report/${val}"] [data-qa="archive-btn"]`).click({ force:true });
        });
    });
});