import testData from "../../../../fixtures/not_full_reports/final/final_values_reconciliation/QA-6265.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from '../../../../actions/base';
import { Income, Property, Sales, Final } from "../../../../actions";

describe(`As Is Market Value is calculated correctly on Reconciliation card for AsIs report`,
    { tags:[ "@final", "@final_values_reconciliation" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Login, create report. Fill summary data.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.numberOfUnits)
                .selectBasisSquareFootAnalysis(testData.squareFootBasis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea);

            cy.stepInfo(`2. Go to Property - Commercial Units and add SF for unit/s`);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterUnitSFByUnitIndex(testData.unitSf);

            cy.stepInfo(`3. Navigate to Income - Cap Rate Conclusion and get rounding factor value`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.setRoundingFactorValueAlias();

            cy.stepInfo(`4. Navigate to Sales -> Value Conclusion page and set Concluded value per SF`);
            _NavigationSection.navigateToSalesValueConclusion();
            Sales._ValueConclusion.enterSaleValueConclusion(testData.concludedValuePerSf);

            cy.stepInfo(`5. Save 'Final Market Value' for further checks`);
            Sales._ValueConclusion.setMarketValueFinal(testData.valueConclusionAsIs);
        });

        it("[QA-6265]", () => {
            cy.stepInfo(`6. Navigate to Final -> Final Values Reconciliation. Check 'Sales' value approach.`);
            _NavigationSection.navigateToFinalValuesReconciliation();
            Final._FinalValuesReconciliation.checkFinalValueApproachRadio(testData.finalValueApproachSales);

            //Before verifying final values they should be set in map from Value Conclusion page
            cy.stepInfo(`7. As Is Market Value in Estimated Values grid > Sales Comparison Approach row>Conclusion 
            column is pulled from Sales > Value Conclusion>As Is Market Value (Final Value column) or calculated with 
            correct formula As Is Market Value = rounded [Selected basis for Square Foot Analysis 
            (Property > Summary page) * input Concluded Value per SF (Sales>Value Conclusion page)]`);
            Final._FinalValuesReconciliation.verifySalesComparisonApproach(testData.valueConclusionAsIs);

            cy.stepInfo(`8. As Is Market Value in Final Value Opinion>Conclusion column is pulled from Sales > Value 
            Conclusion > As Is Market Value (Final Value column) or calculated with correct formula 
            As Is Market Value = rounded [Selected basis for Square Foot Analysis (Property > Summary page) 
            * input Concluded Value per SF (Sales>Value Conclusion page)]`);
            Final._FinalValuesReconciliation.verifyFinalValueOpinion(testData.valueConclusionAsIs);
        });
    });