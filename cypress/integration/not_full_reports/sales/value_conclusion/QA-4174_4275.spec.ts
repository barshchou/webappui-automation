import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4174_4275.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";
import * as PagesRoutes from "../../../../enums/pages_routes";
import { Property } from "../../../../actions";

describe("Prospective Market Value As Stabilized is calculated with correct formula",
    { tags: [ "@sales", "@value_conclusion" ] }, () => {
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        Object.values(Enums.BASIS_SQUARE_FOOT_ANALYSIS).forEach(( value, index) => {
            it(`Calculation with ${value} Basis for Square Foot Analysis`, () => {
                NavigationSection.openPageByVisit(PagesRoutes._PropertyRoutes._Summary);
                Property._Summary.selectBasisSquareFootAnalysis(value);
                if (value === Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossBuildingArea) {
                    Property._Summary.enterGrossBuildingArea(testData.basisSFAnalysisValues[index]);
                } else {
                    Property._Summary.fillBasisSquareFootAnalysis(testData.basisSFAnalysisValues[index]);
                }
                NavigationSection.navigateToSalesValueConclusion();
                Sales.ValueConclusion.enterSaleValueConclusion(testData.valueConclusion)
                    .verifyBasisSFAnalysisTableCellText(Object.values(Enums.BASIS_SQUARE_FOOT_ANALYSIS_TEXTS)[index])
                    .verifyBasisForAnalysisAmount(testData.basisSFAnalysisValues[index])
                    .verifyAsStabilizedAmount(testData.basisSFAnalysisValues[index] * testData.valueConclusion)
                    .verifyAsStabilizedFinalValue(testData.finalValues[index]);
            });
        });
    });