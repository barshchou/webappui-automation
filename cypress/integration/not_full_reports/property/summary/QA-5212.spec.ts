import testData from "../../../../fixtures/not_full_reports/property/summary/QA-5212.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("[QA-5212] Verify validation of the Residential Units and Commercial Units fields",
    { tags: [ "@property", "@summary", "@salesforce" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo("1. Create a new report NOT in NYC on the WebApp");
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("2. Proceed to the Property > Summary");
            _NavigationSection.navigateToPropertySummary();

            cy.stepInfo("3. Verify what is displayed in the Building Name field");
            Property._Summary.Page.buildingNameInput.should("have.value", testData.buildingName);
    
        });
    });
