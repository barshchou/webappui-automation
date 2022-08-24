import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-6240.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Sales from "../../../../actions/sales/sales.manager";
import { Income } from "../../../../actions";

describe(`Prospective Market Value As Stabilized is calculated with correct formula`,
    { tags:[ "@sales", "@value_conclusion" ] }, () => {

        it("[QA-6240]", () => {
            cy.stepInfo(`1. Login, create report. Fill summary data.`);
            createReport(testData.reportCreationData);
            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterNumberOfResUnits(testData.numberOfUnits)
                .selectBasisSquareFootAnalysis(testData.squareFootBasis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea);

            cy.stepInfo(`2. Go to Property - Commercial Units and add SF for unit/s`);
            NavigationSection.navigateToCommercialUnits();
            Property.CommercialUnits.enterUnitSFByUnitIndex(testData.unitSf);

            cy.stepInfo(`3. Navigate to Income - Cap Rate Conclusion and get rounding factor value`);
            NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.setRoundingFactorValueAlias();

            cy.stepInfo(`4. Go to Sales → Value Conclusion page → Sales Value Conclusion Table. 
                        Enter concluded value per SF`);
            NavigationSection.navigateToSalesValueConclusion();
            Sales.ValueConclusion.enterSaleValueConclusion(testData.concludedValuePerSf);

            cy.stepInfo(`5. Verify that Prospective Market Value As Stabilized (Amount) = 
                        Concluded Value per SF * selected Basis for Square Foot Analysis`);
            Sales.ValueConclusion.verifyAsIsAsStabilizedAmountCell(testData.valueConclusionAsStabilized);

            cy.stepInfo(`6. Verify that Prospective Market Value As Stabilized (Final Value) rounded correctly 
                        according to selection in “Round to nearest” on Income>Cap Rate Conclusion page`);
            Sales.ValueConclusion.verifyFinalValueCalculated(testData.valueConclusionAsStabilized);
        });
    });