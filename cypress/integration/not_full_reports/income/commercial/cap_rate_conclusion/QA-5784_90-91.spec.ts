import { _NavigationSection } from '../../../../../actions/base';
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/cap_rate_conclusion/QA-5784_90-91.fixture";
import { DataCollections, Income, Property } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import launchDarklyApi from '../../../../../api/launchDarkly.api';

// Problems with rounding
describe.skip("Validation of Market Values Per SF for ACAS reports", 
    { tags:[ "@income", "@commercial", "@cap_rate_conclusion", "@feature_flag" ] }, () => {
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
        });

        it("[QA-5784][QA-5790][QA-5791]", () => {
            cy.stepInfo(`6. Set Cap Rate value`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.capRate);

            cy.stepInfo(`7. Make Sure Prospective Market Value As Stabilized (Amount) = NOI / Concluded Cap Rate`);
            Income._CapRateConclusion.verifyAsStabilizedAmountCell(testData.valueConclusionAsStabilized);

            cy.stepInfo(`8.Make Sure Prospective Market Value As Stabilized (Final Value) is Prospective Market Value 
            As Stabilized (Amount) rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyFinalValueCalculated(testData.valueConclusionAsStabilized);

            cy.stepInfo(`[QA-5790] 9. Verify if Prospective Market Value As Stabilized Per SF is calculated with 
            correct formula based on selected Basis for Square Foot Analysis`);
            Income._CapRateConclusion.verifyMarketValuePerSFCalculated(testData.squareFootAnalysisArea, 
                testData.valueConclusionAsStabilized);

            cy.stepInfo(`10. Add New Residential Rent Loss on As Stabilized tab and 
            New Commercial Rent Loss on As Stabilized tab`);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsStabilized);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsStabilized);
                
            cy.stepInfo(`11. Fill in with valid numeric values:
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

            cy.stepInfo(`12. Make sure Prospective Market Value As Complete (Amount) =  
            Prospective Market Value As Stabilized (Amount) - Less Residential Rent Loss - 
            Less Commercial Rent Loss - Less Undetermined Commercial Rent Loss - 
            Less Commission Fee - Less Entrepreneurial Profit*`);
            Income._CapRateConclusion
                .verifyProspectiveMarketValueAsIsAsCompleteCalculated(testData.valueConclusionKeyAsStabilized, 
                    testData.valueConclusionAsComplete);

            cy.stepInfo(`13. Make sure Prospective Market Value As Complete (Final Value) = 
            Prospective Market Value As Complete (Amount) rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyFinalValueCalculated(testData.valueConclusionAsComplete);

            cy.stepInfo(`[QA-5791] 14. Verify if Prospective Market Value As Complete Per SF is calculated 
            with correct formula based on selected Basis for Square Foot Analysis`);
            Income._CapRateConclusion.verifyMarketValuePerSFCalculated(testData.squareFootAnalysisArea, 
                testData.valueConclusionAsComplete);

            cy.stepInfo(`15. Add New Residential Rent Loss on As Complete tab and New Commercial 
            Rent Loss on As Complete tab `);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsComplete);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsComplete);

            cy.stepInfo(`16. Fill in with valid numeric values:
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

            cy.stepInfo(`17. Make sure As Is Market Value (Amount) = Prospective Market Value As Complete Per SF - 
            Less Residential Rent Loss - Less Commercial Rent Loss - Less Undetermined Commercial Rent Loss - 
            Renovation Budget ( on Property>Renovations page) - Less Buyout Cost - Less Entrepreneurial Profit*`);
            Income._CapRateConclusion.verifyAsIsMarketValueCalculated(testData.valueConclusionKeyAsComplete, 
                testData.valueConclusionAsIs);

            cy.stepInfo(`18. Make sure As Is Market Value (Final Value) =  As Is Market Value (Amount) 
            rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyFinalValueCalculated(testData.valueConclusionAsIs);

            cy.stepInfo(`[QA-5784] 19. Verify if  As Is Market Value Per SF  is calculated with correct formula 
            based on selected Basis for Square Foot Analysis`);
            Income._CapRateConclusion.verifyMarketValuePerSFCalculated(testData.squareFootAnalysisArea, 
                testData.valueConclusionAsIs);
        });

        after(`Remove feature flag`, () => {
            launchDarklyApi.removeUserTarget(testData.featureFlagKey);
        });
    });
