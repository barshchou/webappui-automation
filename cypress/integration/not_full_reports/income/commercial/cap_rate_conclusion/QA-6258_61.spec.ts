import { _NavigationSection } from '../../../../../actions/base';
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/cap_rate_conclusion/QA-6258_61.fixture";
import { Income, Property } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import launchDarklyApi from '../../../../../api/launchDarkly.api';

describe("Validation of Market Values Per SF for AS STABILIZED reports", 
    { tags:[ "@income", "@commercial", "@cap_rate_conclusion", "@feature_flag" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Set feature flag and create report`);
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Set square foot analysis and value for it; 
            set commercial and residential units; 
            set commercial units SF`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.selectBasisSquareFootAnalysis(testData.basisForSquareFootAnalysis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea)
                .enterNumberOfCommercialUnits(testData.commercialUnits)
                .enterNumberOfResUnits(testData.residentialUnits);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.commercialUnitsSF, testData.commercialUnits);

            cy.stepInfo(`3. Fill commercial units with valid values`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            testData.commercialMonthlyRent.forEach((commercialUnitRent, index) => {
                Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterRentPerSFAnnuallyByRowNumber(commercialUnitRent, index);
            });

            cy.stepInfo(`4. Fill residential units with valid values`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            testData.residentialMonthlyRent.forEach((residentialUnitRent, index) => {
                Income._Residential.InPlaceRentRoll.enterLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterMonthlyRentByRowNumber(residentialUnitRent, index);
            });
        });

        it("[QA-6258][QA-6261]", () => {
            cy.stepInfo(`5. Set Cap Rate value`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.capRate);

            cy.stepInfo(`6. Make Sure Prospective Market Value As Stabilized (Amount) = NOI / Concluded Cap Rate`);
            Income._CapRateConclusion.verifyAsStabilizedAmountCell();

            cy.stepInfo(`7.Make Sure Prospective Market Value As Stabilized (Final Value) is Prospective Market Value 
            As Stabilized (Amount) rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyAsStabilizedFinalValueCalculated();

            cy.stepInfo(`8. Add New Residential Rent Loss on As Stabilized tab and 
            New Commercial Rent Loss on As Stabilized tab`);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsStabilized);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsStabilized);
                
            cy.stepInfo(`9. Fill in with valid numeric values:
            - Less Residential Rent Loss
            - Less Commercial Rent Loss
            - Less Undetermined Commercial Rent Loss
            - Less Commission Fee
            - Less Entrepreneurial Profit`);
            Income._CapRateConclusion.enterAsStabilizedCommissionFeeAmount(testData.lessCommissionFee)
                .enterAsStabilizedLessEntrepreneurialProfit(testData.entrepreneurialProfit)
                .enterAsStabResRentLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsStabilized)
                .enterAsStabCommercialRentLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsStabilized)
                .enterAsStabCommercialUndeterminedRentLossTimePeriodByRow(testData.rentLossTimePeriod, 
                    testData.valueConclusionKeyAsStabilized);

            cy.stepInfo(`10. Make sure Prospective Market Value As Complete (Amount) =  
            Prospective Market Value As Stabilized (Amount) - Less Residential Rent Loss - 
            Less Commercial Rent Loss - Less Undetermined Commercial Rent Loss - 
            Less Commission Fee - Less Entrepreneurial Profit*`);
            Income._CapRateConclusion
                .verifyMarketValueAsIsAsCompleteCalculated(testData.conclusionValueAsStabilized, 
                    testData.valueConclusionKeyAsStabilized);

            cy.stepInfo(`11. Make sure As Is Market Value (Final Value) = As Is Market Value (Amount) 
            rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyAsIsFinalValueCalculated();
        
            cy.stepInfo(`12. Verify if  As Is Market Value Per SF is calculated with correct formula 
            based on selected Basis for Square Foot Analysis`);
            Income._CapRateConclusion.verifyAsIsMarketPerSFCalculated(testData.squareFootAnalysisArea);
        });

        after(`Remove feature flag`, () => {
            launchDarklyApi.removeUserTarget(testData.featureFlagKey);
        });
    });