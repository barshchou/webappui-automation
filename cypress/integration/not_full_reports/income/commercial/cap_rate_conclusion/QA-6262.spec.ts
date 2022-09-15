import { _NavigationSection } from '../../../../../actions/base';
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/cap_rate_conclusion/QA-6262.fixture";
import { Income, DataCollections, Property } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import launchDarklyApi from '../../../../../api/launchDarkly.api';

// ToDo: Test fails due to problem with rounding: https://bowery.atlassian.net/browse/QA-6954
describe("As Is Market Value is calculated with correct formula in Cap Rate Conclusion Summary Table", 
    { tags:[ "@income", "@commercial", "@cap_rate_conclusion", "@feature_flag" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Set feature flag and create report`);
            launchDarklyApi.setFeatureFlagForUser(testData.enableFlexibleGbaAnalysis, testData.onFeatureFlag);
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

        it("[QA-6262]", () => {
            cy.stepInfo(`6. Set Cap Rate value`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.capRate);

            cy.stepInfo(`7. Make Sure Prospective Market Value As Stabilized (Amount) = NOI / Concluded Cap Rate`);
            Income._CapRateConclusion.verifyAsStabilizedAmountCell(testData.valueConclusionAsStabilized);

            cy.stepInfo(`8.Make Sure Prospective Market Value As Stabilized (Final Value) is Prospective Market Value 
            As Stabilized (Amount) rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyFinalValueCalculated(testData.valueConclusionAsStabilized);

            cy.stepInfo(`9. Add New Residential Rent Loss on As Stabilized tab and 
            New Commercial Rent Loss on As Stabilized tab`);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsStabilized);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsStabilized);
                
            cy.stepInfo(`10. Fill in with valid numeric values:
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

            cy.stepInfo(`11. Make sure Prospective Market Value As Complete (Amount) =  
            Prospective Market Value As Stabilized (Amount) - Less Residential Rent Loss - 
            Less Commercial Rent Loss - Less Undetermined Commercial Rent Loss - 
            Less Commission Fee - Less Entrepreneurial Profit*`);
            Income._CapRateConclusion
                .verifyProspectiveMarketValueAsIsAsCompleteCalculated(testData.valueConclusionKeyAsStabilized, 
                    testData.valueConclusionAsComplete);

            cy.stepInfo(`12. Make sure Prospective Market Value As Complete (Final Value) = 
            Prospective Market Value As Complete (Amount) rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyFinalValueCalculated(testData.valueConclusionAsComplete);

            cy.stepInfo(`13. Add New Residential Rent Loss on As Complete tab and New Commercial 
            Rent Loss on As Complete tab `);
            Income._CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsComplete);
            Income._CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.conclusionValueAsComplete, testData.valueConclusionAsComplete);

            cy.stepInfo(`14. Fill in with valid numeric values:
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

            cy.stepInfo(`15. Make sure As Is Market Value (Amount) = Prospective Market Value As Complete Per SF - 
            Less Residential Rent Loss - Less Commercial Rent Loss - Less Undetermined Commercial Rent Loss - 
            Renovation Budget ( on Property>Renovations page) - Less Buyout Cost - Less Entrepreneurial Profit*`);
            Income._CapRateConclusion.verifyAsIsMarketValueCalculated(testData.valueConclusionKeyAsComplete, 
                testData.valueConclusionAsIs);

            cy.stepInfo(`16. Make sure As Is Market Value (Final Value) =  As Is Market Value (Amount) 
            rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyFinalValueCalculated(testData.valueConclusionAsIs);
        });

        after(`Remove feature flag`, () => {
            launchDarklyApi.removeUserTarget(testData.enableFlexibleGbaAnalysis);
        });
    });
