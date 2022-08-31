import { Sales, ReviewExport } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4053_86..fixture";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _Summary } from "../../../../actions/property";
import { numberWithCommas } from '../../../../../utils/numbers.utils';

describe(`[QA-4053] [QA-4086] The Concluded Value Per Unit is calculated correctly 
        and includes both commercial and residential units.`, 
{ tags: [ "@check_export", "@sales", "@value_conclusion" ] }, () => {

    it("Test body", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo(`Precondition: Navigate to report summary and specify amount of residential and commercial units`);
        _NavigationSection.navigateToPropertySummary();
        _Summary.enterNumberOfResUnits(testData.general.residentialUnits).
            enterNumberOfCommercialUnits(testData.general.commercialUnits);
        
        cy.stepInfo(`1. Proceed to the Sales > Adjust Comps page.`);
        _NavigationSection.navigateToSalesValueConclusion().navigateToAdjustComps();

        cy.stepInfo(`2. Select the Per Total Units radio button in the Sale Comparables Setup and save it.`);
        Sales._AdjustComps.closeUserSurveyIfExist().clickComparisonPerUnitRadioButton();

        cy.stepInfo(`3. Proceed to the Sales > Value Conclusions > Sales Value Conclusion Table.`);
        _NavigationSection.navigateToSalesValueConclusion();

        cy.stepInfo(`4. Verify that the Concluded Value Per Unit is calculated correctly`);
        let totalValue = '$' + numberWithCommas((testData.general.commercialUnits + 
            testData.general.residentialUnits) * testData.general.valueConclusion);
        Sales._ValueConclusion.enterSaleValueConclusion(testData.general.valueConclusion)
            .verifySaleValueConclusion(testData.general.valueConclusion)
            .verifyProspectiveMarketValueAmount(testData.valueConclusionAsStabilized, totalValue)
            .verifyProspectiveMarketValueAmount(testData.valueConclusionAsIs, totalValue)
            .verifyProspectiveMarketValueAmount(testData.valueConclusionAsComplete, totalValue);

        _NavigationSection.openReviewAndExport().closeUserSurveyIfExist();
        ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
            .generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
    });
    
    it("Check export report", () => {
        cy.stepInfo(`Verify the export of the report`);
        cy.task("getFilePath",
            { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" }
        ).then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);

            cy.stepInfo(`Proceed to the Sales Comparison Approach > Value Opinion via the 
                        Sales Comparison Approach and verify the value.`);
            cy.contains(testData.valueOpinionSection).next("table")
                .scrollIntoView()
                .within(() => {
                    cy.contains(testData.concludedValueSection).should("exist")
                        .parents("tr").within(() => {
                            cy.contains(`${testData.general.valueConclusion}`).should("exist");
                        });
                }); 
        });
    });
});