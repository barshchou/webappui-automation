import testData from "../../../../../fixtures/not_full_reports/sf_integration/property/market/QA-4835.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { Property } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import Enums from "../../../../../enums/enums";

describe("Market and Submarket fields prefilling from Salesforce",
    { tags: [ "@property", "@market", "@salesforce" ] }, () => {

        testData.reportFixtures.forEach(report => {
            it(`${report.specName}`, () => {
                cy.stepInfo("1. Login and create SF report");
                createReport(report.reportData);
    
                cy.stepInfo("2. Proceed to the Property > Market");
                _NavigationSection.navigateToPropertyMarket();
    
                cy.stepInfo("3. Verify Market and Submarket fields are prefilled from Salesforce");
                Property._Market.Page.getMarketInputByAnalysisUse(Enums.MARKET_ANALYSIS_USES.multifamily)
                    .should("have.value", report.market);
                Property._Market.Page.getSubmarketInputByAnalysisUse(Enums.MARKET_ANALYSIS_USES.multifamily)
                    .should("have.value", report.submarket);
            });
        });
    });
