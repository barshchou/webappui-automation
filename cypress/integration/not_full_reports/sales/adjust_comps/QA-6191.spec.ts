import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-6191.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property, Sales } from "../../../../actions";

describe("SF is a row name in expanded Other Adjustment section", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        it(`[QA-6191]`, () => {
            cy.stepInfo(`Precondition: Create a report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Go to Property>Summary page and select any Basis for Square Foot Analysis`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.selectBasisSquareFootAnalysis(testData.squareFootAnalysisBasis)
                .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea);

            cy.stepInfo(`2. Go to Sales>Adjust Comps and expand Other Adjustment`);
            NavigationSection.navigateToAdjustComps();

            cy.stepInfo(`3. Verify that SF is static name of first row `);
            Sales._AdjustComps.Page.getAdjustmentArrow(testData.adjustmentName).click();
            Sales._AdjustComps.Page.getOtherAdjustmentSF.should('exist');
        });
    });