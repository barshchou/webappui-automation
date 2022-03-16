import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4015.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";

describe("Verify the Commercial Stabilized Rent Roll table", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {   
        cy.stepInfo(`
        1. Proceed to the Income Approach > Commercial Stabilized Rent Roll and fill all fields on the WebApp.
        `);
        NavigationSection.clickIncomeApproachButton()
        .pause().clickCommercialArrow()
        .pause().openCommercialStabilizedRentRollInCommercial().pause();
        
        cy.stepInfo(`
        2. Go to the Commercial Stabilized Rent Roll table in the export and check:
            removed the leading # column; 
            removed the decimal place for Annual Rent, represent as a whole number;
            removed the decimal place for Monthly Rent, represent as a whole number.
        `);
        /**
         * Test body
         */

        cy.stepInfo(`
        3. Verify that Totals text at the bottom of the new first column are displayed.
        `)
        /**
         * Test body
         */

        deleteReport(testData.reportCreationData.reportNumber);
    });
});