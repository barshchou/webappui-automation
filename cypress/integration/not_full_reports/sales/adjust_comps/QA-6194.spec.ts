import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-6194.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property, Sales } from "../../../../actions";
import Enums from "../../../../enums/enums";

describe(`Commercial Area/SF for Subject is calculated with correct formula in Utility Adjustment section`, 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        testData.reportCreationFixture.forEach(reportType => {
            it(`[QA-6194] ${reportType.incomeValue}`, () => {
                cy.stepInfo(`Precondition: Create a report`);
                createReport(reportType);
    
                cy.stepInfo(`Precondition: Select any option as basis for Square Foot Analysis and fill 
                in Square Foot field with valid numeric value. `);
                _NavigationSection.navigateToPropertySummary();
                Property._Summary.selectBasisSquareFootAnalysis(testData.squareFootAnalysisBasis)
                    .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea);

                if (reportType.incomeValue != Enums.INCOME_TYPE.residential) {
                    cy.stepInfo(`Precondition: Make sure at least one Commercial Unit is added. 
                    Go to Property > Commercial Units and fill in Commercial Unit SF with valid numeric value.`);
                    Property._Summary.enterNumberOfCommercialUnits(testData.commercialUnits);
                    _NavigationSection.navigateToCommercialUnits();
                    Property._CommercialUnits.enterListUnitSF(testData.commercialUnitsArea, testData.commercialUnits);
                }
    
                cy.stepInfo(`1. Go to Sales > Adjust Comps and expand Utility Adjustment section`);
                NavigationSection.navigateToAdjustComps();
                Sales._AdjustComps.expandAdjustmentDetails(testData.adjustmentName);
    
                cy.stepInfo(`2. Verify Commercial Area/SF row for Subject column 
                in Utility Adjustment section is calculate`);
                Sales._AdjustComps.verifyCommercialAreaSf(reportType.incomeValue, testData.squareFootAnalysisArea, 
                    testData.commercialUnitsArea);
            });
        });
        
    });