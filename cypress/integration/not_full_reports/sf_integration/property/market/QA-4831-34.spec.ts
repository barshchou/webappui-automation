import testData from "../../../../../fixtures/not_full_reports/sf_integration/property/market/QA-4831-34.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { Property } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Neighborhood and Area fields are prefilled from Salesforce",
    { tags: [ "@property", "@market", "@salesforce" ] }, () => {

        // TODO: Fail test QA-4833. Bug WEB-6823
        testData.reportFixtures.forEach(report => {
            it(`${report.specName}`, () => {
                cy.stepInfo("1. Login and create SF report");
                createReport(report.reportData);
    
                cy.stepInfo("2. Proceed to the Property > Market");
                _NavigationSection.navigateToPropertyMarket();
    
                cy.stepInfo("3. Verify Neighborhood and Area fields are prefilled from Salesforce");
                Property._Market.Page.neighborhoodInput.should("have.value", report.neighborhood);
                Property._Market.Page.areaInput.should("have.value", report.area);
            });
        });
    });
