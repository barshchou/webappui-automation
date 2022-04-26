import { Sales } from './../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4053.fixture";
import { _NavigationSection } from "../../../../actions/base/index";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import { _Summary } from "../../../../actions/property";


describe("[QA-4053] [QA-4086] The Concluded Value Per Unit is calculated correctly and includes both commercial and residential units.", () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", { tags: '@to_check_export' }, () => {
        cy.stepInfo('Precondition: Navigate to report summary and specify amount of residential and commercial units');
        _NavigationSection.navigateToPropertySummary();
        _Summary.enterNumberOfResUnits(testData.general.residentialUnits).
            enterNumberOfCommercialUnits(testData.general.commercialUnits);
        
        cy.stepInfo('1. Proceed to the Sales > Adjust Comps page.');
        _NavigationSection.navigateToSalesValueConclusion().clickAdjustCompsButton();

        cy.stepInfo('2. Select the Per Total Units radio button in the Sale Comparables Setup and save it.');
        Sales._AdjustComps.clickComparisonPerUnitRadioButton();

        cy.stepInfo('3. Proceed to the Sales > Value Conclusions > Sales Value Conclusion Table.');
        _NavigationSection.navigateToSalesValueConclusion();

        cy.stepInfo('4. Verify that the Concluded Value Per Unit is calculated correctly');
        let totalValue = '$' + ((testData.general.commercialUnits + testData.general.residentialUnits) * testData.general.valueConclusion).toLocaleString();
        Sales._ValueConclusion.enterSaleValueConclusion(testData.general.valueConclusion)
            .verifySaleValueConclusion(testData.general.valueConclusion)
            .verifyAsStabilizedAmount(totalValue)
            .verifyAsIsMarketAmount(totalValue)
            .verifyAsCompleteAmount(totalValue);

        // TODO: Add export verify
        // Proceed to the Sales Comparison Approach > Value Opinion via the Sales Comparison Approach and verify the value.
        
        deleteReport(testData.reportCreationData.reportNumber);
    });
});