import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4174_4275.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";
import * as PagesRoutes from "../../../../enums/pages_routes";
import { Property } from "../../../../actions";

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
            NavigationSection.openPageByVisit(PagesRoutes._PropertyRoutes._Summary);
            Property._Summary.selectBasisSquareFootAnalysis(value);
            if (value === Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossBuildingArea) {
                Property._Summary.enterGrossBuildingArea(testData.basisSFAnalysisValues[index]);
            } else {
                Property._Summary.fillBasisSquareFootAnalysis(testData.basisSFAnalysisValues[index]);
            }

            cy.stepInfo(`2. Navigate to Sales -> Value Conclusion, verify Basis, it's value, 
            As stabilized amount and Final value`);
            NavigationSection.navigateToSalesValueConclusion();
            Sales.ValueConclusion.enterSaleValueConclusion(testData.valueConclusion)
                .verifyBasisSFAnalysisTableCellText(Object.values(Enums.BASIS_SQUARE_FOOT_ANALYSIS_TEXTS)[index])
                .verifyBasisForAnalysisAmount(testData.basisSFAnalysisValues[index])
                .verifyProspectiveMarketValueAmount(testData.valueConclusionAsStabilized, 
                    testData.basisSFAnalysisValues[index] * testData.valueConclusion)
                .verifyProspectiveMarketValueFinal(testData.valueConclusionAsStabilized, testData.finalValues[index]);
        });
    });
});