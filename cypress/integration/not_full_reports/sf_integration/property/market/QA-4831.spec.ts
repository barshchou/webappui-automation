import testData from "../../../../../fixtures/not_full_reports/sf_integration/property/market/QA-4831.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { Property } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Neighborhood and Area fields are NOT prefilled (analysis are not selected in the Salesforce)",
    { tags: [ "@property", "@market", "@salesforce" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo("1. Create SF report");
            createReport(testData.reportData);
        });

        it("[QA-4831]", () => {
            cy.stepInfo("2. Proceed to the Property > Market");
            _NavigationSection.navigateToPropertyMarket();

            cy.stepInfo(`3. Verify Neighborhood and Area fields are NOT prefilled (analysis are not selected 
                        in the Salesforce)`);
            Property._Market.Page.neighborhood.should("have.value", "");
            Property._Market.Page.area.should("have.value", "");
        });
    });
