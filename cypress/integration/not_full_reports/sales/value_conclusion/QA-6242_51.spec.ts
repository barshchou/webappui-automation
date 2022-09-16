import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-6242.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { DataCollections, Income, Property, Sales } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";

describe(`As Is Market Value is calculated with correct formula`,
    { tags:[ "@sales", "@value_conclusion" ] }, () => {

        it("[QA-6242][QA-6251]", () => {
            cy.stepInfo(`1. Login, create report. Fill summary data.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits)
                .selectBasisSquareFootAnalysis(testData.squareFootBasis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea);

            cy.stepInfo(`2. Go to Property - Commercial Units and add SF for unit/s`);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterUnitSFByUnitIndex(testData.unitSf);

            cy.stepInfo(`3. Navigate to Income - Cap Rate Conclusion and get rounding factor value`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.setRoundingFactorValueAlias();

            cy.stepInfo(`4. Go to Sales → Value Conclusion page → Sales Value Conclusion Table. 
                        Enter concluded value per SF`);
            _NavigationSection.navigateToSalesValueConclusion();
            Sales._ValueConclusion.enterSaleValueConclusion(testData.concludedValuePerSf);

            cy.stepInfo(`5. Verify that Prospective Market Value As Is (Amount) = 
                        Concluded Value per SF * selected Basis for Square Foot Analysis`);
            Sales._ValueConclusion.verifyAsIsAsStabilizedAmountCell(testData.valueConclusionAsIs);

            cy.stepInfo(`6. Verify that Prospective Market Value As Is (Final Value) rounded correctly 
                        according to selection in “Round to nearest” on Income > Cap Rate Conclusion page`);
            Sales._ValueConclusion.verifyFinalValueCalculated(testData.valueConclusionAsIs);

            /*
             * Please refer to 6245, 6248 tests for other parts of QA-6251 test
             */
            cy.stepInfo(`[QA-6251] 7. Verify Sales Value in Header is displayed based on selected Basis for 
                        Square Foot Analysis and pulled from Sales > Value Conclusion page`);
            Sales._ValueConclusion.clickSaveButton().verifyProgressBarNotExist();
            Sales._ValueConclusion.verifyHeaderSalesValue(testData.valueConclusionAsIs);
        });
    });