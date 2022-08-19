import testData from "../../../../fixtures/not_full_reports/property/market/QA-4470.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe(`[QA-4470] Verify that with every use checkbox user unselects, its corresponding Submarket & 
        Market type-ahead dropdowns disappear`, { tags: [ "@property", "@market" ] }, () => {

    it("Test body", () => {
        cy.stepInfo(`1. Create a new report on the WebApp and navigate to Property > Market.`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertyMarket();

        cy.stepInfo(`2. Verify that with every use checkbox user unselects, its 
                    corresponding Submarket & Market type-ahead dropdowns disappear.`);

        Property._Market.checkUncheckMarketAnalysisUseCheckbox(testData.marketAnalysisUses[0], false);

        testData.marketAnalysisUses.forEach((use) => {
            Property._Market.checkUncheckMarketAnalysisUseCheckbox(use, true)
                .verifyMarketAnalysisUseCheckboxState(use, true);
            Property._Market.Page.getMarketInputByAnalysisUse(use).should("exist");
            Property._Market.Page.getSubmarketInputByAnalysisUse(use).should("exist");
            Property._Market.checkUncheckMarketAnalysisUseCheckbox(use, false)
                .verifyMarketAnalysisUseCheckboxState(use, false);
        });
    });

});