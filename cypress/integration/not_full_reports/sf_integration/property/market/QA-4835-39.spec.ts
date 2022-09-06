import testData from "../../../../../fixtures/not_full_reports/sf_integration/property/market/QA-4835-39.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { Property } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Market and Submarket fields prefilling from Salesforce",
    { tags: [ "@property", "@market", "@salesforce" ] }, () => {

        testData.reportFixtures.forEach(report => {
            it(`${report.specName}`, () => {
                cy.stepInfo("1. Login and create SF report");
                createReport(report.reportData);
    
                cy.stepInfo("2. Proceed to the Property > Market");
                _NavigationSection.navigateToPropertyMarket();

                cy.stepInfo("3. Check market analysis use checkbox");
                Property._Market.checkUncheckMarketAnalysisUseCheckbox(report.marketAnalysisUses, true);

                cy.stepInfo("4. Verify Market and Submarket fields are prefilled from Salesforce");
                Property._Market.Page.getMarketInputByAnalysisUse(report.marketAnalysisUses)
                    .should("have.value", report.market);
                Property._Market.Page.getSubmarketInputByAnalysisUse(report.marketAnalysisUses)
                    .should("have.value", report.submarket);
            });
        });
    });
