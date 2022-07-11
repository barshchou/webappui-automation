import { _NavigationSection } from './../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4130.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import launchDarklyApi from "../../../../api/launchDarkly.api";
import { Sales, Property } from "../../../../actions";

describe("Adjusted Price per Residential Unit in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales", "@feature_flag" ] }, () => {

    before("Login, create report", () => {
        cy.stepInfo("1. Turn on “Enable flexible gba analysis” feature flag");
        launchDarklyApi.getFeatureFlag(testData.featureFlagKey);
        // launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("2. Go to Property > Summary page and fill Residential Units and Commercial Units");
        _NavigationSection.navigateToPropertySummary();

        Property._Summary.enterNumberOfCommercialUnits(1)
            .enterNumberOfResUnits(1);

        // _NavigationSection.navigateToFindComps();
        // Sales._FindComps.selectCompFromMapByAddress(testData.comparable.address);
        // _NavigationSection.navigateToAdjustComps();
        // Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
        //     .enterPropertyRightsByColumn(testData.comparable.propertyRights)
        //     .verifyTrendedPriceByColumn(testData.comparable.trendedPrice);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    after("Remove feature flag", () => {
        launchDarklyApi.removeUserTarget(testData.featureFlagKey);
    });
});