import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-6220.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Income, Sales, DataCollections } from "../../../../actions";

describe(`Sale Price is pulled correctly according to selected Basis for Square Foot Analysis`, 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create a report`);
            createReport(testData.reportCreationData);
        });

        it(`[QA-6220]`, () => {
            cy.stepInfo(`2. Select any option as basis for Square Foot Analysis and fill in 
            Square Foot field with valid numeric value. Make sure at least one residential 
            unit is added on Property>Summary page`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberUnits)
                .selectBasisSquareFootAnalysis(testData.squareFootAnalysisBasis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea)
                .enterGrossBuildingArea(testData.grossBuildingArea);

            cy.stepInfo(`3. Fill in Monthly Rent  for residential units on Income > Residential > 
            In-Place RR page, so Annual Total is calculated`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            testData.residentialUnit.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.enterMonthlyRentByRowNumber(unit.monthlyRent, index)
                    .enterLeaseStatusByRowNumber(unit.leaseStatus, index)
                    .enterRentTypeCellByRowNumber(unit.rentType, index);
            });
        
            cy.stepInfo(`4. Go to Income > Cap Rate Conclusion page and fill in Concluded Cap Rate 
            with valid numeric value, so Prospective Market Value As Stabilized (not rounded) 
            is calculated (after saving this value should be displayed in header as Income Value)`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.concludedCapRate)

            cy.stepInfo(`5. Save to As Stabilized amount for further use in test`);
            Income._CapRateConclusion.setAmountAlias(testData.valueConclusionAsStabilized);

            cy.stepInfo(`6. Go to Sales > Adjust Comps page`);
            _NavigationSection.navigateToAdjustComps();

            cy.stepInfo(`7. Make sure PSF radio button  is selected as Calculation Units`);
            Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits);

            cy.stepInfo(`8. Verify Sale Price for Subject in expanded Market Adjustment section 
            is pulled as not rounded Prospective Market Value As Stabilized from Income > Cap Rate Conclusion 
            page and calculation there is based on selected BAsis for SF Analysis on Property>Summary page`);
            Sales._AdjustComps.expandAdjustmentDetails(testData.adjustmentName)
                .verifyExpandMarketAdjustmentSalePrice(testData.calculationUnits);
        });
    });