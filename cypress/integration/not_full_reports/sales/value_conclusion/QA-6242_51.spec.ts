import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-6242.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Sales from "../../../../actions/sales/sales.manager";
import { Income } from "../../../../actions";

describe(`As Is Market Value is calculated with correct formula`,
    { tags:[ "@sales", "@value_conclusion" ] }, () => {

        it("[QA-6242][QA-6251]", () => {
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

            cy.stepInfo(`5. Verify that Prospective Market Value As Is (Amount) = 
                        Concluded Value per SF * selected Basis for Square Foot Analysis`);
            Sales.ValueConclusion.verifyAsIsAsStabilizedAmountCell(testData.valueConclusionAsIs);

            cy.stepInfo(`6. Verify that Prospective Market Value As Is (Final Value) rounded correctly 
                        according to selection in “Round to nearest” on Income > Cap Rate Conclusion page`);
            Sales.ValueConclusion.verifyFinalValueCalculated(testData.valueConclusionAsIs);

            /*
             * Please refer to 6245, 6248 tests for other parts of QA-6251 test
             */
            cy.stepInfo(`[QA-6251] 7. Verify Sales Value in Header is displayed based on selected Basis for 
                        Square Foot Analysis and pulled from Sales > Value Conclusion page`);
            Sales.ValueConclusion.clickSaveButton().verifyProgressBarNotExist();
            Sales.ValueConclusion.verifyHeaderSalesValue(testData.valueConclusionAsIs);
        });
    });