import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-6191-92.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Sales } from "../../../../actions";
import Enums from "../../../../enums/enums";

describe(`Other Adjustment section cell values validation`, 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        it(`[QA-6191][QA-6192]`, () => {
            cy.stepInfo(`Precondition: Create a report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Go to Property>Summary page and select any Basis for Square Foot Analysis`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.selectBasisSquareFootAnalysis(testData.squareFootAnalysisBasis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea);

            cy.stepInfo(`2. Go to Sales>Adjust Comps and expand Other Adjustment`);
            NavigationSection.navigateToAdjustComps();

            cy.stepInfo(`3. Verify that SF is static name of first row`);
            Sales._AdjustComps.expandAdjustmentDetails(testData.adjustmentName);
            Sales._AdjustComps.Page.getAdjustmentExpansionCellLabel(testData.otherAdjustmentRowLabel)
                .should('have.text', Enums.OTHER_ADJUSTMENTS_EXPANSION_ROWS.sf);
            Sales._AdjustComps.Page.getAdjustmentExpansionCellValue(testData.otherAdjustmentRowLabel)
                .should('have.text', `${testData.squareFootAnalysisArea}`);
        });
    });