import { Property } from './../../../../../actions/index';
import { _NavigationSection } from './../../../../../actions/base/index';
import testData from "../../../../../fixtures/not_full_reports/income/commercial/cap_rate_conclusion/QA-5784.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import launchDarklyApi from '../../../../../api/launchDarkly.api';

describe("", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll", "@feature_flag" ] }, () => {
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
            NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.commercialUnitsSF, testData.commercialUnits);

            cy.stepInfo(`3. Set Gut Renovation budget`);
            _NavigationSection.navigateToRenovation();
            Property._Renovations.chooseRenovationByValue(testData.gutRenovation)
                .clickTotalButton()
                .fillTotalTable(testData.renovationPeriod, testData.renovationTotal);

            cy.stepInfo(`4. Fill commercial units with valid values`);
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            testData.commercialMonthlyRent.forEach((commercialUnitRent, index) => {
                Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterRentPerSFAnnuallyByRowNumber(commercialUnitRent, index);
            });

            cy.stepInfo(`5. Fill residential units with valid values`);
            NavigationSection.navigateToResInPlaceRentRoll();
            testData.residentialMonthlyRent.forEach((residentialUnitRent, index) => {
                Income.Residential.InPlaceRentRoll.enterLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterMonthlyRentByRowNumber(residentialUnitRent, index);
            });
        });

        it("Test body", () => {
            cy.stepInfo(`6. Set Cap Rate value`);
            NavigationSection.navigateToCapRateConclusion();
            Income.CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.capRate);

            cy.stepInfo(`7. Make Sure Prospective Market Value As Stabilized (Amount) = NOI / Concluded Cap Rate`);
            Income.CapRateConclusion.verifyAsStabilizedAmountCell();

            cy.stepInfo(`8.Make Sure Prospective Market Value As Stabilized (Final Value) is Prospective Market Value 
            As Stabilized (Amount) rounded according to “Round to nearest” value`);
            Income.CapRateConclusion.verifyAsStabilizedFinalValueCalculated();

            cy.stepInfo(`9. Add New Residential Rent Loss on As Stabilized tab and 
            New Commercial Rent Loss on As Stabilized tab`);
            Income.CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.valueConclusionAsStabilized);
            Income.CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.valueConclusionAsStabilized);
                

            cy.stepInfo(`10. Fill in with valid numeric values:
            - Less Residential Rent Loss
            - Less Commercial Rent Loss
            - Less Undetermined Commercial Rent Loss
            - Less Commission Fee
            - Less Entrepreneurial Profit`);
            Income.CapRateConclusion.enterAsStabilizedCommissionFeeAmount(testData.lessCommissionFee)
                .enterAsStabilizedLessEntrepreneurialProfit(testData.entrepreneurialProfit)
                .enterAsStabResRentLossTimePeriodByRow(testData.rentLossTimePeriod)
                .enterAsStabCommercialRentLossTimePeriodByRow(testData.rentLossTimePeriod)
                .enterAsStabCommercialUndeterminedRentLossTimePeriodByRow(testData.rentLossTimePeriod);

            cy.stepInfo(`11. Make sure Prospective Market Value As Complete (Amount) =  
            Prospective Market Value As Stabilized (Amount) - Less Residential Rent Loss - 
            Less Commercial Rent Loss - Less Undetermined Commercial Rent Loss - 
            Less Commission Fee - Less Entrepreneurial Profit*`);
            Income.CapRateConclusion.verifyProspectiveMarketValueAsCompleteCalculated();

            cy.stepInfo(`12. Make sure Prospective Market Value As Complete (Final Value) = 
            Prospective Market Value As Complete (Amount) rounded according to “Round to nearest” value`);
            Income.CapRateConclusion.verifyAsCompleteFinalValueCalculated();

            cy.stepInfo(`13. Add New Residential Rent Loss on As Complete tab and New Commercial 
            Rent Loss on As Complete tab `);
            Income.CapRateConclusion.addNewRentLoss(testData.residentialUnitType, testData.residentialUnits, 
                testData.valueConclusionAsComplete);
            Income.CapRateConclusion.addNewRentLoss(testData.commercialUnitType, testData.commercialUnits, 
                testData.valueConclusionAsComplete);

            cy.stepInfo(`14. Fill in with valid numeric values:
            - Less Residential Rent Loss
            - Less Commercial Rent Loss
            - Less Undetermined Commercial Rent Loss
            - Renovation Budget ( on Property>Renovations page)
            - Less Buyout Cost
            - Less Entrepreneurial Profit*`);
            Income.CapRateConclusion.enterAsCompleteResRentLossTimePeriodByRow(testData.rentLossTimePeriod)
                .enterAsCompleteCommercialRentLossTimePeriodByRow(testData.rentLossTimePeriod)
                .enterAsCompleteCommercialUndeterminedRentLossTimePeriodByRow(testData.rentLossTimePeriod)
                .enterAsCompleteLessEntrepreneurialProfit(testData.entrepreneurialProfit)
                .enterAsCompleteLessBuyoutCost(testData.lessBuyoutCost);

            cy.stepInfo(`15. Make sure As Is Market Value (Amount) = Prospective Market Value As Complete Per SF - 
            Less Residential Rent Loss - Less Commercial Rent Loss - Less Undetermined Commercial Rent Loss - 
            Renovation Budget ( on Property>Renovations page) - Less Buyout Cost - Less Entrepreneurial Profit*`);
            Income.CapRateConclusion.verifyAsIsMarketValueCalculated();

            cy.stepInfo(`16. Make sure As Is Market Value (Final Value) =  As Is Market Value (Amount) 
            rounded according to “Round to nearest” value`);
            Income.CapRateConclusion.verifyAsIsFinalValueCalculated();

            cy.stepInfo(`17. Verify if  As Is Market Value Per SF  is calculated with correct formula 
            based on selected Basis for Square Foot Analysis`);
            Income.CapRateConclusion.verifyAsIsMarketPerSFCalculated(testData.squareFootAnalysisArea);
            
        });

        after(`Remove feature flag`, () => {
            launchDarklyApi.removeUserTarget(testData.featureFlagKey);
        });
    });