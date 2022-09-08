import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-6190.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import launchDarklyApi from "../../../../api/launchDarkly.api";
import { Income, Sales, DataCollections } from "../../../../actions";

describe("Adjusted Price Per SF in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales", "@feature_flag" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Turn on “Enable flexible gba analysis” feature flag`);
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
            createReport(testData.reportCreationData);
        });

        it(`[QA-6190]`, () => {
            cy.stepInfo(`2. Navigate to Property > Summary page and fill Residential Units`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberUnits)
                .selectBasisSquareFootAnalysis(testData.squareFootAnalysisBasis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea)
                .enterGrossBuildingArea(testData.grossBuildingArea);

            cy.stepInfo(`3. Navigate to Residential In-Place Rent-Roll and table for Residential Units
            with valid values`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            testData.residentialUnit.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.enterMonthlyRentByRowNumber(unit.monthlyRent, index)
                    .enterLeaseStatusByRowNumber(unit.leaseStatus, index)
                    .enterRentTypeCellByRowNumber(unit.rentType, index);
            });
        
            cy.stepInfo(`4. Fill in Concluded Cap Rate on Income > Cap Rate Conclusion page. 
            Make sure As Is Market Value is not negative value`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.concludedCapRate);

            cy.stepInfo(`5. Go to Sales>Adjust Comps page`);
            _NavigationSection.navigateToAdjustComps();

            cy.stepInfo(`6. Make sure PSF radio button  is selected as Calculation Units`);
            Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits);

            cy.stepInfo(`7. Verify Price per SF for Subject in expanded Market Adjustment section 
            is calculated based on the selected basis of comparison: 
            [Sale Price / selected Basis for Square Foot Analysis]`);
            Sales._AdjustComps.expandAdjustmentDetails(testData.adjustmentName)
                .verifyExpandMarketAdjustmentPricePerSF(testData.calculationUnits, 
                    testData.squareFootAnalysisArea);
        });

        after("Remove feature flag", () => {
            launchDarklyApi.removeUserTarget(testData.featureFlagKey);
        });
    });