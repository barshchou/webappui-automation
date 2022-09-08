import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4174_4275.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";
import { DataCollections, Sales } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import routesUtils from "../../../../utils/routes.utils";

describe(`[QA-4174] Prospective Market Value As Stabilized is calculated with correct formula
               [QA-4275] Basis for Square Foot Analysis value pulled from Property -> Summary -> 
               As Is Building Description/As Complete Building Description`,
{ tags: [ "@sales", "@value_conclusion" ] }, () => {
    
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    Object.values(Enums.BASIS_SQUARE_FOOT_ANALYSIS).forEach(( value, index) => {
        it(`Test with ${value} Basis for Square Foot Analysis`, () => {
            cy.stepInfo(`1. Navigate to Property -> Summary, select ${value} basis and enter it's value`);
            _NavigationSection.openPageByVisit(routesUtils.subjectPropertyData);
            DataCollections._SubjectPropertyData.selectBasisSquareFootAnalysis(value);
            if (value === Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossBuildingArea) {
                DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.basisSFAnalysisValues[index]);
            } else {
                DataCollections._SubjectPropertyData.fillBasisSquareFootAnalysis(testData.basisSFAnalysisValues[index]);
            }

            cy.stepInfo(`2. Navigate to Sales -> Value Conclusion, verify Basis, it's value, 
            As stabilized amount and Final value`);
            _NavigationSection.navigateToSalesValueConclusion();
            Sales._ValueConclusion.enterSaleValueConclusion(testData.valueConclusion)
                .verifyBasisSFAnalysisTableCellText(Object.values(Enums.BASIS_SQUARE_FOOT_ANALYSIS_TEXTS)[index])
                .verifyBasisForAnalysisAmount(testData.basisSFAnalysisValues[index])
                .verifyProspectiveMarketValueAmount(testData.valueConclusionAsStabilized, 
                    testData.basisSFAnalysisValues[index] * testData.valueConclusion)
                .verifyProspectiveMarketValueFinal(testData.valueConclusionAsStabilized, testData.finalValues[index]);
        });
    });
});