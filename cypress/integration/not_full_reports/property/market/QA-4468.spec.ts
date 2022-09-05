import testData from "../../../../fixtures/not_full_reports/property/market/QA-4468.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe(`[Property > Market > Market reports] Check that on first time load "Multifamily" 
        checkbox is selected by default`, { tags: [ "@property", "@market" ] }, () => {
    it("[QA-4468]", () => {
        cy.stepInfo(`1. Create a new report on the WebApp and navigate to Property > Market.`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertyMarket();

        cy.stepInfo(`2. Verify that the first time page is loaded - "Multifamily" checkbox is selected by default
                    AND the Multifamily Submarket and Multifamily Market type-ahead dropdowns appear`);
        Property._Market.verifyMarketAnalysisUseCheckboxState(testData.multifamily, true)
            .Page.getMarketInputByAnalysisUse(testData.multifamily).should("exist");
        Property._Market.Page.getSubmarketInputByAnalysisUse(testData.multifamily).should("exist");
    });
});