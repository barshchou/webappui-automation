import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-6248-49.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { DataCollections, Income, Property, Sales } from "../../../../actions";
import launchDarklyApi from "../../../../api/launchDarkly.api";
import { _NavigationSection } from "../../../../actions/base";

describe(`Prospective Market Value As Complete is calculated with correct formula`,
    { tags:[ "@sales", "@value_conclusion" ] }, () => {

        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Set feature flag and create report`);
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Set square foot analysis and value for it; 
                        set commercial and residential units; 
                        set commercial units SF`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.selectBasisSquareFootAnalysis(testData.basisForSquareFootAnalysis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea)
                .enterNumberOfCommercialUnits(testData.commercialUnits)
                .enterNumberOfResUnits(testData.residentialUnits);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.commercialUnitsSF, testData.commercialUnits);

            cy.stepInfo(`3. Set Gut Renovation budget`);
            _NavigationSection.navigateToRenovation();
            Property._Renovations.chooseRenovationByValue(testData.gutRenovation)
                .clickTotalButton()
                .fillTotalTable(testData.renovationPeriod, testData.renovationTotal);

            cy.stepInfo(`4. Fill commercial units with valid values`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            testData.commercialMonthlyRent.forEach((commercialUnitRent, index) => {
                Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterRentPerSFAnnuallyByRowNumber(commercialUnitRent, index);
            });

            cy.stepInfo(`5. Fill residential units with valid values`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            testData.residentialMonthlyRent.forEach((residentialUnitRent, index) => {
                Income._Residential.InPlaceRentRoll.enterLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterMonthlyRentByRowNumber(residentialUnitRent, index);
            });

            cy.stepInfo(`6. Set Cap Rate value`);
            _NavigationSection.navigateToCapRateConclusion();
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
        });

        it("[QA-6248][QA-6249][QA-6251]", () => {
            cy.stepInfo(`[QA-6248] 11. Prospective Market Value As Complete (for ACAS report)-->Should be calculated 
                        with formula Prospective Market Value As Complete (Amount) = Prospective Market Value As 
                        Stabilized (Amount) - Less Residential Rent Loss - Less Commercial Rent Loss - 
                        Less Undetermined Commercial Rent Loss - Less Commission Fee - Less Entrepreneurial Profit*`);
            _NavigationSection.navigateToSalesValueConclusion();
            Sales._ValueConclusion.enterSaleValueConclusion(testData.concludedValuePerSf)
                .verifyProspectiveMarketValueAsIsAsCompleteCalculated(testData.valueConclusionKeyAsStabilized, 
                    testData.valueConclusionAsComplete);
            
            cy.stepInfo(`[QA-6248] 12. Verify that Prospective Market Value As Complete (Final Value) 
                        rounded correctly according to selection in “Round to nearest” 
                        on Income > Cap Rate Conclusion page`);
            Sales._ValueConclusion.verifyFinalValueCalculated(testData.valueConclusionAsComplete);

            cy.stepInfo(`[QA-6249] 13. As Is Market Value (for ACAS report)-->Should be calculated with formula
                        As Is Market Value (Amount) = Prospective Market Value As Complete (Amount) - 
                        Less Residential Rent Loss - Less Commercial Rent Loss -  
                        Less Undetermined Commercial Rent Loss - Renovation Budget - Less Buyout Cost - 
                        Less Entrepreneurial Profit*`);
            Sales._ValueConclusion
                .verifyAsIsMarketValueCalculated(testData.valueConclusionKeyAsComplete, 
                    testData.valueConclusionAsIs);

            cy.stepInfo(`[QA-6249] 14. Verify that As Is Market Value (Final Value) rounded correctly 
                        according to selection in "Round to nearest" on Income > Cap Rate Conclusion page`);
            Sales._ValueConclusion.verifyFinalValueCalculated(testData.valueConclusionAsIs);

            /*
             * Please refer to 6242, 6245 tests for other parts of QA-6251 test
             */
            cy.stepInfo(`[QA-6251] 15. Verify Sales Value in Header is displayed based on selected Basis for 
                        Square Foot Analysis and pulled from Sales > Value Conclusion page`);
            Sales._ValueConclusion.clickSaveButton().verifyProgressBarNotExist();
            Sales._ValueConclusion.verifyHeaderSalesValue(testData.valueConclusionAsStabilized);
        });
    });