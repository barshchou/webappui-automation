import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/property/market/QA-4471.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";


describe("'Pull from dropbox' clicked - needed files are uploaded", 
    { tags: [ "@property", "@market", "@fix" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertyMarket();
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        testData.researchesUses.forEach(researchUseObject => {
            it(`Test with ${researchUseObject.use} market analysis use`, () => {

                cy.stepInfo(`1. Check ${researchUseObject.use} use checkbox`);
                Property._Market.checkUncheckMarketAnalysisUseCheckbox(researchUseObject.use, true);

                cy.stepInfo("2. Fill market research data");
                Property._Market.fillMarketResearch(researchUseObject.research, researchUseObject.use);

                cy.stepInfo("3. Pull data from dropbox and verify");
                Property._Market.clickPullFromDropbox()
                    .setFilesValuesToMap(researchUseObject.use)
                    .verifyAnyFileInputHasFile(researchUseObject.use)
                    .checkUncheckMarketAnalysisUseCheckbox(researchUseObject.use, false);
            });
        });

    });
