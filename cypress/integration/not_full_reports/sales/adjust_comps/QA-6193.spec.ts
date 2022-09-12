import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-6193.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property, Sales } from "../../../../actions";
import Enums from "../../../../enums/enums";

describe(`Commercial Area/SF is row name in expanded Utilities Adjustment section`, 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        it(`[QA-6193]`, () => {
            cy.stepInfo(`Precondition: Create a report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Go to Property>Summary page and select any Basis for Square Foot Analysis`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.selectBasisSquareFootAnalysis(testData.squareFootAnalysisBasis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea);

            cy.stepInfo(`2. Go to Sales > Adjust Comps and expand Utilities Adjustment`);
            NavigationSection.navigateToAdjustComps();

            cy.stepInfo(`3. Verify that Commercial Area/SF is static name of the last row in`);
            Sales._AdjustComps.expandAdjustmentDetails(testData.adjustmentName);
            Sales._AdjustComps.Page.getAdjustmentExpansionCellLabel(testData.utilitiesAdjustmentRowLabel)
                .should('have.text', Enums.UTILITIES_ADJUSTMENTS_EXPANSION_ROWS.commercialAreaSf);
        });
    });