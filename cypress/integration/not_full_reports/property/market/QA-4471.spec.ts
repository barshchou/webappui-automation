import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/property/market/QA-4171.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import Enums from "../../../../enums/enums";


describe("'Pull from dropbox' clicked - needed files are uploaded", () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertyMarket();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    testData.checkboxes.forEach((marketAnalysisUse, index) => {
        it(`Test with ${marketAnalysisUse} property type`, () => {
            if (marketAnalysisUse === Enums.MARKET_ANALYSIS_USES.MULTIFAMILY) {
                Property._Market.verifyMarketAnalysisUseCheckboxChecked(marketAnalysisUse);
            } else {
                Property._Market.checkMarketAnalysisUseCheckbox(marketAnalysisUse);
            }
            Property._Market.fillMarketResearch(testData.marketResearches[index], marketAnalysisUse)
                .clickPullFromDropbox()
                .verifyAreaEconomicAnalysisHasFile()
                .verifyNeighborhoodDemographicHasFile()
                .verifyMarketByAnalysisUseHasFile(marketAnalysisUse)
                .verifySubmarketByAnalysisUseHasFile(marketAnalysisUse)
                .uncheckMarketAnalysisUseCheckbox(marketAnalysisUse);
        });
    });

    it("Delete report", () => {
        deleteReport(testData.reportCreationData.reportNumber);
    });

});
