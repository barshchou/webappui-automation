import { Sales, Final } from '../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/final/final_values_reconciliation/QA-6268-70.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import { Income } from "../../../../actions";
import launchDarklyApi from "../../../../api/launchDarkly.api";

describe(`As Is Market Value is calculated correctly on Reconciliation card`,
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

            cy.stepInfo(`3. Set Gut Renovation budget`);
            NavigationSection.navigateToRenovation();
            Property.Renovations.chooseRenovationByValue(testData.gutRenovation)
                .clickTotalButton()
                .fillTotalTable(testData.renovationPeriod, testData.renovationTotal);

            cy.stepInfo(`4. Fill commercial units with valid values`);
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            testData.commercialMonthlyRent.forEach((commercialUnitRent, index) => {
                Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterRentPerSFAnnuallyByRowNumber(commercialUnitRent, index);
            });

            cy.stepInfo(`5. Fill residential units with valid values`);
            NavigationSection.navigateToResInPlaceRentRoll();
            testData.residentialMonthlyRent.forEach((residentialUnitRent, index) => {
                Income._Residential.InPlaceRentRoll.enterLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterMonthlyRentByRowNumber(residentialUnitRent, index);
            });

            cy.stepInfo(`6. Set Cap Rate value`);
            NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.capRate)
                .setRoundingFactorValueAlias();

            cy.stepInfo(`7. Add New Residential Rent Loss on As Stabilized tab and 
                        New Commercial Rent Loss on As Stabilized tab`);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsStabilized);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsStabilized);
                
            cy.stepInfo(`8. Fill in with valid numeric values:
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

            cy.stepInfo(`9. Add New Residential Rent Loss on As Complete tab and New Commercial 
                    Rent Loss on As Complete tab `);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsComplete);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsComplete);
        
            cy.stepInfo(`10. Fill in with valid numeric values:
                        - Less Residential Rent Loss
                        - Less Commercial Rent Loss
                        - Less Undetermined Commercial Rent Loss
                        - Renovation Budget ( on Property>Renovations page)
                        - Less Buyout Cost
                        - Less Entrepreneurial Profit*`);
            Income._CapRateConclusion.enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                testData.valueConclusionKeyAsComplete, testData.rentLossTypeResidential)
                .enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsComplete, testData.rentLossTypeCommercial)
                .enterLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsComplete, testData.rentLossTypeUndetermined)
                .enterLessEntrepreneurialProfit(testData.entrepreneurialProfit, testData.valueConclusionKeyAsComplete)
                .enterAsCompleteLessBuyoutCost(testData.lessBuyoutCost);

            cy.stepInfo(`11. Navigate to Sales -> Value Conclusion page and set Concluded value per SF`);
            NavigationSection.navigateToSalesValueConclusion();
            Sales._ValueConclusion.enterSaleValueConclusion(testData.concludedValuePerSf);

            cy.stepInfo(`12. Set final values into cy._map`);
            Sales._ValueConclusion.setMarketValueFinal(testData.valueConclusionAsComplete)
                .setMarketValueFinal(testData.valueConclusionAsStabilized)
                .setMarketValueFinal(testData.valueConclusionAsIs);

        });

        it("[QA-6270][QA-6269][QA-6268]", () => {
            cy.stepInfo(`13. Navigate to Final -> Final Values Reconciliation. Check 'Sales' value approach.`);
            NavigationSection.navigateToFinalValuesReconciliation();
            Final._FinalValuesReconciliation.checkFinalValueApproachRadio(testData.finalValueApproachSales);

            //Before verifying final values they should be set in map from Value Conclusion page
            cy.stepInfo(`14. Verify: As Is Market Value in Estimated Values grid>Sales Comparison Approach row > 
            Conclusion column is pulled from Sales>Value Conclusion > As Is Market Value (Final Value column) or 
            calculated with correct formula As Is Market Value = rounded [Prospective Market Value As Complete (Amount)
             - Less Residential Rent Loss - Less Commercial Rent Loss - Less Undetermined Commercial Rent Loss - 
            Renovation Budget - Less Buyout Cost - Less Entrepreneurial Profit*]`);
            Final._FinalValuesReconciliation.verifySalesComparisonApproach(testData.valueConclusionAsComplete)
                .verifySalesComparisonApproach(testData.valueConclusionAsStabilized)
                .verifySalesComparisonApproach(testData.valueConclusionAsIs);

            cy.stepInfo(`15. Verify: As Is Market Value in Final Value Opinion > Conclusion column is pulled 
            from Sales > Value Conclusion > As Is Market Value (Final Value column) or calculated with correct 
            formula: As Is Market Value = rounded [Prospective Market Value As Complete (Amount) - 
            Less Residential Rent Loss - Less Commercial Rent Loss - Less Undetermined Commercial Rent Loss - 
            Renovation Budget - Less Buyout Cost - Less Entrepreneurial Profit*]`);
            Final._FinalValuesReconciliation.verifyFinalValueOpinion(testData.valueConclusionAsComplete)
                .verifyFinalValueOpinion(testData.valueConclusionAsStabilized)
                .verifyFinalValueOpinion(testData.valueConclusionAsIs);

            cy.pause();
        });
    });