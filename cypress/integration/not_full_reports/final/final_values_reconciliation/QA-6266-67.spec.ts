import { Sales, Final } from '../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/final/final_values_reconciliation/QA-6266-67.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import { Income } from "../../../../actions";
import launchDarklyApi from "../../../../api/launchDarkly.api";

// TODO: Test fails due to bug: https://bowery.atlassian.net/browse/WEB-6862
describe(`As Is, As Stabilized, Market Value is calculated correctly on Reconciliation card for AsStabilized report`,
    { tags:[ "@final", "@final_values_reconciliation" ] }, () => {

        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Set feature flag and create report`);
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Set square foot analysis and value for it; 
                        set commercial and residential units; 
                        set commercial units SF`);
            NavigationSection.navigateToPropertySummary();
            Property.Summary.selectBasisSquareFootAnalysis(testData.basisForSquareFootAnalysis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea)
                .enterNumberOfCommercialUnits(testData.commercialUnits)
                .enterNumberOfResUnits(testData.residentialUnits);
            NavigationSection.navigateToCommercialUnits();
            Property.CommercialUnits.enterListUnitSF(testData.commercialUnitsSF, testData.commercialUnits);

            cy.stepInfo(`3. Fill commercial units with valid values`);
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            testData.commercialMonthlyRent.forEach((commercialUnitRent, index) => {
                Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterRentPerSFAnnuallyByRowNumber(commercialUnitRent, index);
            });

            cy.stepInfo(`4. Fill residential units with valid values`);
            NavigationSection.navigateToResInPlaceRentRoll();
            testData.residentialMonthlyRent.forEach((residentialUnitRent, index) => {
                Income._Residential.InPlaceRentRoll.enterLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterMonthlyRentByRowNumber(residentialUnitRent, index);
            });

            cy.stepInfo(`5. Set Cap Rate value`);
            NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.capRate)
                .setRoundingFactorValueAlias();

            cy.stepInfo(`6. Add New Residential Rent Loss on As Stabilized tab and 
                        New Commercial Rent Loss on As Stabilized tab`);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsStabilized);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsStabilized);
                
            cy.stepInfo(`7. Fill in with valid numeric values:
                        - Less Residential Rent Loss
                        - Less Commercial Rent Loss
                        - Less Undetermined Commercial Rent Loss
                        - Less Commission Fee
                        - Less Entrepreneurial Profit`);
            Income._CapRateConclusion.enterAsStabilizedCommissionFeeAmount(testData.lessCommissionFee)
                .enterLessEntrepreneurialProfit(testData.entrepreneurialProfit, testData.valueConclusionKeyAsStabilized)
                .enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsStabilized, testData.rentLossTypeResidential)
                .enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsStabilized, testData.rentLossTypeCommercial)
                .enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsStabilized, testData.rentLossTypeUndetermined);

            cy.stepInfo(`8. Navigate to Sales -> Value Conclusion page and set Concluded value per SF`);
            NavigationSection.navigateToSalesValueConclusion();
            Sales._ValueConclusion.enterSaleValueConclusion(testData.concludedValuePerSf);

            cy.stepInfo(`9. Set final values into cy._map`);
            Sales._ValueConclusion.setMarketValueFinal(testData.valueConclusionAsStabilized)
                .setMarketValueFinal(testData.valueConclusionAsIs);
        });

        it("[QA-6266][QA-6267]", () => {
            cy.stepInfo(`10. Navigate to Final -> Final Values Reconciliation. Check 'Sales' value approach.`);
            NavigationSection.navigateToFinalValuesReconciliation();
            Final._FinalValuesReconciliation.checkFinalValueApproachRadio(testData.finalValueApproachSales);

            //Before verifying final values they should be set in map from Value Conclusion page
            cy.stepInfo(`11. Prospective Market Value As Stabilized in Estimated Values grid > Sales Comparison 
            Approach row>Conclusion column is pulled from Sales > Value Conclusion > Prospective Market Value 
            As Stabilized (Final Value column) or calculated with correct formula Prospective Market Value As 
            Stabilized  = rounded [Selected basis for Square Foot Analysis (Property > Summary page) * 
            input Concluded Value per SF (Sales>Value Conclusion page)]`);
            Final._FinalValuesReconciliation.verifySalesComparisonApproach(testData.valueConclusionAsStabilized)
                .verifySalesComparisonApproach(testData.valueConclusionAsIs);

            cy.stepInfo(`12. Prospective Market Value As Stabilized in Final Value Opinion > Conclusion column 
            is pulled from Sales>Value Conclusion > Prospective Market Value As Stabilized (Final Value column) 
            or calculated with correct formula Prospective Market Value As Stabilized = 
            rounded [Selected basis for Square Foot Analysis (Property>Summary page) * input Concluded 
            Value per SF (Sales>Value Conclusion page)]`);
            Final._FinalValuesReconciliation.verifyFinalValueOpinion(testData.valueConclusionAsStabilized)
                .verifyFinalValueOpinion(testData.valueConclusionAsIs);
        });
    });