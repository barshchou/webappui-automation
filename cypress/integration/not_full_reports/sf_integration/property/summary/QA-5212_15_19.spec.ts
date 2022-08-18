import testData from "../../../../../fixtures/not_full_reports/sf_integration/property/summary/QA-5212_15_19.fixture";
import { _HomePage, _NavigationSection } from "../../../../../actions/base";
import { Property } from "../../../../../actions";
import { loginAction } from "../../../../../actions/base/baseTest.actions";

describe("[QA-5212] Verify validation of the Residential Units and Commercial Units fields",
    { tags: [ "@property", "@summary", "@salesforce" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo("1. Create a new report NOT in NYC on the WebApp");
            loginAction();
            _HomePage.createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("2. Proceed to the Property > Summary");
            _NavigationSection.navigateToPropertySummary();

            cy.stepInfo("3. Verify what is displayed in the Building Name field");
            Property._Summary.Page.buildingNameInput.should("have.value", testData.buildingName);

            cy.stepInfo("4. Verify what is displayed in the Year Built field");
            Property._Summary.Page.yearBuilt.should("have.value", testData.yearBuilt);

            cy.stepInfo("5. Verify what is displayed in the GBA field");
            Property._Summary.Page.grossBuildingArea.should("have.value", testData.gba);
        });
    });
