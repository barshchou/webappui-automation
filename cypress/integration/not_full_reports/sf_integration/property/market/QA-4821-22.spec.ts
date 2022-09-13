import testData from "../../../../../fixtures/not_full_reports/sf_integration/property/market/QA-4821-22.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { Property } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Neighborhood field is prefilled from the information in Salesforce",
    { tags: [ "@property", "@market", "@salesforce" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo("1. Create SF report");
            createReport(testData.reportData);
        });

        // TODO: Fail this test. Bug WEB-6823
        it("[QA-4821-22]", () => {
            cy.stepInfo("2. Proceed to the Property > Market");
            _NavigationSection.navigateToPropertyMarket();

            cy.stepInfo("3. Verify the Neighborhood, Area in the webapp matches Neighborhood, Area in the Salesforce");
            Property._Market.Page.neighborhood.should("have.value", testData.neighborhood);
            Property._Market.Page.area.should("have.value", testData.area);
        });
    });
