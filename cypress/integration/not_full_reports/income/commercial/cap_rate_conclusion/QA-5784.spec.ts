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
            cy.stepInfo("1. Set feature flag and create report");
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
            createReport(testData.reportCreationData);
            
            cy.stepInfo("2. Set square foot analysis and value for it; set commercial and residential units");
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.selectBasisSquareFootAnalysis(testData.basisForSquareFootAnalysis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea)
                .enterNumberOfCommercialUnits(testData.commercialUnits)
                .enterNumberOfResUnits(testData.residentialUnits);

            cy.stepInfo(`3. Fill commercial units with valid values`);
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            testData.commercialMonthlyRent.forEach((commercialUnitRent, index) => {
                Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterRentPerSFAnnuallyByRowNumber(commercialUnitRent, index);
            });

            cy.stepInfo(`3. Fill residential units with valid values`);
            NavigationSection.navigateToResInPlaceRentRoll();
            testData.residentialMonthlyRent.forEach((residentialUnitRent, index) => {
                Income.Residential.InPlaceRentRoll.enterLeaseStatusByRowNumber(testData.leaseStatus, index)
                    .enterMonthlyRentByRowNumber(residentialUnitRent, index);
            });
        });

        it("Test body", () => {
            
            cy.pause();
            

        });

        after(`Remove feature flag`, () => {
            launchDarklyApi.removeUserTarget(testData.featureFlagKey);
        });
    });