import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4015.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";
import ReviewExport from "../../../../../actions/reviewExport/reviewExport.actions";

describe("Verify the Commercial Stabilized Rent Roll table", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {  
        cy.stepInfo(`
        1. Proceed to the Income Approach > Commercial Stabilized Rent Roll and fill all fields on the WebApp.
        `);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
        for (let i = 0; i < testData.numberOfCommercialUnits; i++) {
            Property.CommercialUnits.clickCommercialUnitTabByIndex(i)
                .clickRadioButtonByValueAndUnitIndex(testData.groupName, testData.useRadios[i], i);
        }    
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits)
            .enterTenantNames(testData.tenantNames, testData.leaseStatuses);
        testData.rentsPsf.forEach((rent, index) => {
            if (testData.leaseStatuses[index] !== "Vacant") {
                Income.Commercial.InPlaceRentRoll.enterAnnualRentPerSFByRowNumber(rent, index);
            }
        });
        NavigationSection.openCommercialStabilizedRentRollInCommercial()
            .verifyProgressBarNotExist();
        Income.Commercial.StabilizedRentRoll.clickSaveButton()
            .verifyProgressBarNotExist();

        cy.stepInfo(`
        2. Go to the Commercial Stabilized Rent Roll table in the export and check:
            removed the leading # column; 
            removed the decimal place for Annual Rent, represent as a whole number;
            removed the decimal place for Monthly Rent, represent as a whole number.
        `);
        NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().clickSubmitBtn()
        .waitForReportGenerated();
        /**
         * Below - should be interaction with docx file. 
         * Since we're not figure out yet how to properly do such verifications in Cypress
         * We will do this manually if necessary.
         */
        
        cy.stepInfo(`
        3. Verify that Totals text at the bottom of the new first column are displayed.
        `)
        /**
         * See comments above.
         */

        deleteReport(testData.reportCreationData.reportNumber);
    });
});