import testData from "../../../../fixtures/not_full_reports/property/market/QA-4258_59.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import Enums from "../../../../enums/enums";

describe("Verify area analysis pull from dropbox", { tags: [ "@property", "@market" ] }, () => {
    
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it(`[QA-4259] Verify if there is no area analysis to be pulled in for the input quarter/year - 
    error that the file does not exist appears
    [QA-4258] Check if there is no area analysis pulled in, the most recent 
    quarter/year is pulled from DropBox`, () => {

        cy.stepInfo("1. Navigate to Property -> Market");
        _NavigationSection.navigateToPropertyMarket();

        cy.stepInfo("2. Fill market research data with quarter for [QA-4259]");
        Property._Market.fillMarketResearch(testData.marketResearch, Enums.MARKET_ANALYSIS_USES.multifamily, true, true)
            .clickPullFromDropbox()
            .verifyAreaEconomicAnalysisInputErrorRetrieving();

        cy.stepInfo("3. Change quarter for [QA-4258]");
        Property._Market.enterMarketQuarter(testData.quarterToChange)
            .clickPullFromDropbox()
            .verifyAreaEconomicAnalysisHasFile(testData.quarterToVerify);
    });
});
