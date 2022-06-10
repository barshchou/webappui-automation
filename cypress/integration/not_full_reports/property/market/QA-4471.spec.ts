import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/property/market/QA-4471.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import Enums from "../../../../enums/enums";


describe("'Pull from dropbox' clicked - needed files are uploaded", { tags: [ "@property", "@market" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertyMarket();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    testData.checkboxes.forEach((marketAnalysisUse, index) => {
        it(`Test with ${marketAnalysisUse} market analysis use`, () => {

            cy.stepInfo(`1. Check ${marketAnalysisUse} use checkbox`);
            if (marketAnalysisUse === Enums.MARKET_ANALYSIS_USES.MULTIFAMILY) {
                Property._Market.verifyMarketAnalysisUseCheckboxChecked(marketAnalysisUse);
            } else {
                Property._Market.checkMarketAnalysisUseCheckbox(marketAnalysisUse);
            }

            cy.stepInfo("2. Fill market research data");
            Property._Market.fillMarketResearch(testData.marketResearches[index], marketAnalysisUse);

            cy.stepInfo("3. Pull data from dropbox and verify");
            Property._Market.clickPullFromDropbox()
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
