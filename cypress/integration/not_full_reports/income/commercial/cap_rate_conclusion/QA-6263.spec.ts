import { _NavigationSection } from '../../../../../actions/base';
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/cap_rate_conclusion/QA-6263.fixture";
import { DataCollections, Income, Property } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import launchDarklyApi from '../../../../../api/launchDarkly.api';

describe("As Stabilized Market Value Per is calculated with correct formula in Cap Rate Conclusion Summary Table", 
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

        it("[QA-6263]", () => {
            cy.stepInfo(`6. Set Cap Rate value`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.capRate);

            cy.stepInfo(`7. Make Sure Prospective Market Value As Stabilized (Amount) = NOI / Concluded Cap Rate`);
            Income._CapRateConclusion.verifyAsStabilizedAmountCell(testData.valueConclusionAsStabilized);

            cy.stepInfo(`8.Make Sure Prospective Market Value As Stabilized (Final Value) is Prospective Market Value 
            As Stabilized (Amount) rounded according to “Round to nearest” value`);
            Income._CapRateConclusion.verifyFinalValueCalculated(testData.valueConclusionAsStabilized);
        });

        after(`Remove feature flag`, () => {
            launchDarklyApi.removeUserTarget(testData.enableFlexibleGbaAnalysis);
        });
    });
